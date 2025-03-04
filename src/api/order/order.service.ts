import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { plainToInstance } from 'class-transformer';
import { CarInfoDto } from './dto/car-info.dto';
import { calculateDiscount, calculateTax } from '../utils/helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository } from 'typeorm';
import { Car } from '../car/entities/car.entity';
import { PreviewDto } from './dto/preview.dto';
import { Coupon } from './entities/coupon.entity';
import { Order } from './entities/order.entity';
import { Payment } from './entities/payment.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { PaymentFactory } from './factory/payment.factory';
import { PaginationDto } from '../car/dto/pagination.dto';
import { ListOrderDto } from './dto/list-order.dto';
import { ORDER_STATUS } from '../common/constants';

@Injectable()
export class OrderService {
  readonly tax: number;

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    private datasource: DataSource,
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @Inject(PaymentFactory)
    private readonly paymentFactory: PaymentFactory,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {
    this.tax = 8 / 100;
  }

  async preview(body: PreviewDto, lang: string): Promise<object> {
    try {
      let coupon_discount: number = 0;
      let subtotal: number, total: number, tax: number;

      const dateDiff =
        body.items[0].dropoff_date.getDay() -
        body.items[0].pickup_date.getDay();

      const queryBuilder = this.carRepository.createQueryBuilder('cars');
      queryBuilder
        .innerJoinAndSelect(
          'cars.car_translation',
          'car_translation',
          'car_translation.language_code = :lang',
          { lang: lang },
        )
        .innerJoinAndSelect(
          'cars.car_image',
          'car_image',
          'car_image.is_thumbnail = :is_thumbnail',
          { is_thumbnail: true },
        )
        .where('cars.id IN (:id)', { id: body.items[0].id });

      const items = await queryBuilder.getMany();
      if (items.length === 0) throw new BadRequestException('CUS-0404');

      // get car info & price
      const cars = plainToInstance(CarInfoDto, items);

      total = subtotal = cars[0].sale_price || cars[0].price;

      // calculate price
      if (dateDiff <= 1) {
        total *= 1;
      } else {
        total *= dateDiff;
      }

      // calculate coupon
      const coupon = await this.couponRepository.findOneBy({
        code: body.coupon_code || '',
      });

      if (body.coupon_code) {
        if (coupon) {
          coupon_discount = calculateDiscount(subtotal, coupon);
          total -= coupon_discount;
        } else {
          throw new BadRequestException('FIELD-0007');
        }
      }

      // calculate tax
      tax = calculateTax(subtotal, this.tax);
      total += tax;

      return {
        items: cars,
        tax: +(subtotal * this.tax).toFixed(2),
        subtotal: subtotal,
        total: +total.toFixed(2),
      };
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  async create(createOrderDto: CreateOrderDto, user_id: string) {
    const { total, subtotal, coupon, tax } =
      await this.calculatePrice(createOrderDto);

    const paymentMethodName = await this.getPaymentMethodName(
      +createOrderDto.payment_method_id,
    );

    let order: Order;

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');

    try {
      await queryRunner.manager.transaction(
        async (transactionalEntityManager) => {
          const cars = await transactionalEntityManager.find(Car, {
            where: {
              id: +createOrderDto.items[0].id,
              allow_pickup_location: {
                pickup_location: {
                  id: createOrderDto.items[0].pickup_location_id,
                },
              },
              allow_dropoff_location: {
                dropoff_location: {
                  id: createOrderDto.items[0].pickup_location_id,
                },
              },
            },
            relations: [
              'car_translation',
              'car_image',
              'allow_pickup_location.pickup_location',
              'allow_dropoff_location.dropoff_location',
            ],
            lock: {
              mode: 'pessimistic_write',
            },
          });

          if (cars.length === 0) throw new BadRequestException('CUS-0404');

          if (
            !(createOrderDto.items[0].price === cars[0].price) &&
            !(createOrderDto.items[0].sale_price === cars[0].sale_price)
          )
            throw new BadRequestException('FIELD-0011');

          if (
            await this.checkCarUnavailable(
              createOrderDto,
              transactionalEntityManager,
            )
          )
            throw new BadRequestException('FIELD-0009');

          const createdOrder = queryRunner.manager.create(Order, {
            customer_name: createOrderDto.customer_name,
            phone_number: createOrderDto.phone_number,
            address: createOrderDto.address,
            city: createOrderDto.city,
            subtotal: subtotal,
            coupon_discount: coupon.discount,
            tax: tax,
            total: total,
            user: { id: user_id },
            coupon: { id: coupon.id },
            payment_method: { id: +createOrderDto.payment_method_id },
          });

          const car_info = plainToInstance(CarInfoDto, cars[0]);

          order = await queryRunner.manager.save(Order, createdOrder);

          await queryRunner.manager.save(OrderDetail, {
            car_info: car_info,
            order: { id: order.id },
            pickup_location: {
              id: +createOrderDto.items[0].pickup_location_id,
            },
            pickup_date: createOrderDto.items[0].pickup_date,
            dropoff_location: {
              id: +createOrderDto.items[0].dropoff_location_id,
            },
            dropoff_date: createOrderDto.items[0].dropoff_date,
            car: { id: +createOrderDto.items[0].id },
          });

          await queryRunner.manager.save(Payment, {
            order: { id: order.id },
          });
        },
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    }

    createOrderDto.total = total;

    return this.paymentFactory.createPaymentMethod(
      paymentMethodName,
      createOrderDto,
      order.id,
    );
  }

  async getCarIdUnavailableByDate(startDate?: Date, endDate?: Date) {
    const queryBuilder =
      this.orderDetailRepository.createQueryBuilder('order_details');

    queryBuilder
      .leftJoin('order_details.order', 'order', 'order.status != :status', {
        status: ORDER_STATUS.CANCELLED,
      })
      .select('car_id')
      .addGroupBy('car_id');

    if (endDate)
      queryBuilder.andWhere('order_details.pickup_date <= :drop_off_date', {
        drop_off_date: endDate,
      });

    if (startDate)
      queryBuilder.andWhere('order_details.dropoff_date >= :pick_up_date', {
        pick_up_date: startDate,
      });

    const carIds = await queryBuilder.getRawMany();

    if (carIds.length === 0) return [0];

    return carIds.map((value) => value.car_id);
  }

  private async checkCarUnavailable(
    createOrderDTO: CreateOrderDto,
    queryRunner: QueryRunner | EntityManager,
  ) {
    const car = await queryRunner.connection
      .createQueryBuilder(Car, 'cars')
      .innerJoinAndSelect('cars.order_detail', 'order_detail')
      .innerJoinAndSelect(
        'order_detail.order',
        'order',
        'order.status != "cancelled" ',
      )
      .where('cars.id = :car_id', { car_id: +createOrderDTO.items[0].id })
      .andWhere('order_detail.pickup_date <= :drop_off_date', {
        drop_off_date: createOrderDTO.items[0].dropoff_date,
      })
      .andWhere('order_detail.dropoff_date >= :pick_up_date', {
        pick_up_date: createOrderDTO.items[0].pickup_date,
      })
      .getOne();

    if (!car) return false;

    return true;
  }

  async getPaymentMethodName(id: number) {
    const paymentMethodName = await this.paymentMethodRepository
      .createQueryBuilder('payment_methods')
      .select(['payment_methods.name as name'])
      .where('payment_methods.id = :id', { id: id })
      .getRawOne();

    if (!paymentMethodName) throw new BadRequestException('PAY-0001');

    return paymentMethodName.name;
  }

  async getPaymentMethodNameByPaymentOrderID(paymentOrderID: string) {
    const paymentMethodName = await this.paymentRepository
      .createQueryBuilder('payments')
      .innerJoinAndSelect('payments.order', 'order')
      .innerJoinAndSelect('order.payment_method', 'payment_method')
      .select(['payment_method.name as name'])
      .where('payments.payment_order_id = :payment_order_id', {
        payment_order_id: paymentOrderID,
      })
      .getRawOne();

    if (!paymentMethodName) {
      throw new BadRequestException('CUS-0404');
    }

    return paymentMethodName.name;
  }

  async getAllOrders(
    userId: string,
    pagination: PaginationDto,
  ): Promise<object> {
    const { limit = 5, offset = 1 } = pagination;

    const queryBuilder = this.orderRepository.createQueryBuilder('orders');

    queryBuilder
      .innerJoinAndSelect('orders.payment_method', 'payment_method')
      .where('orders.user_id = :user_id', { user_id: userId })
      .orderBy('orders.created_at', 'DESC')
      .limit(limit)
      .offset(limit * (offset - 1));

    const orders = plainToInstance(ListOrderDto, await queryBuilder.getMany());
    const total = await queryBuilder.getCount();

    return {
      items: orders,
      pagination: { total: total, limit, offset },
    };
  }

  async getOrderIDByPaypalOrderID(paypalOrderID: string) {
    const orderID = await this.paymentRepository
      .createQueryBuilder('payments')
      .select(['payments.order_id as order_id'])
      .where('payments.payment_order_id = :payment_order_id', {
        payment_order_id: paypalOrderID,
      })
      .getRawOne();

    if (!orderID) {
      throw new BadRequestException('CUS-0404');
    }

    return orderID.order_id;
  }

  async getOrderDetail(
    userId: string,
    id: string,
    lang: string,
  ): Promise<Order> {
    const queryBuilder = this.orderRepository.createQueryBuilder('orders');

    queryBuilder
      .innerJoinAndSelect('orders.order_detail', 'order_detail')
      .innerJoinAndSelect('orders.payment_method', 'payment_method')
      .innerJoinAndSelect('order_detail.pickup_location', 'pickup_location')
      .innerJoinAndSelect('order_detail.dropoff_location', 'dropoff_location')
      .innerJoinAndSelect(
        'pickup_location.location_translation',
        'pickup_location_translation',
        'pickup_location_translation.language_code = :lang',
        { lang: lang },
      )
      .innerJoinAndSelect(
        'dropoff_location.location_translation',
        'dropoff_location_translation',
        'dropoff_location_translation.language_code = :lang',
        { lang: lang },
      )
      .where('orders.id = :id', { id: id })
      .andWhere('orders.user_id = :userId', { userId: userId });

    const order_detail = await queryBuilder.getOne();

    if (!order_detail) throw new BadRequestException('CUS-0404');

    return order_detail;
  }

  async calculatePrice(body: CreateOrderDto) {
    let coupon_discount: number = 0;
    let subtotal: number;
    let total: number;
    let tax: number;

    total = subtotal = body.items[0].sale_price || body.items[0].price;

    const dateDiff =
      body.items[0].dropoff_date.getDay() - body.items[0].pickup_date.getDay();

    //  calculate price
    if (dateDiff <= 1) {
      total *= 1;
    } else {
      total *= dateDiff;
    }

    // calculate coupon
    const coupon = await this.couponRepository.findOneBy({
      code: body.coupon_code || '',
    });

    if (body.coupon_code) {
      if (coupon) {
        coupon_discount = calculateDiscount(subtotal, coupon);
        total -= coupon_discount;
      } else {
        throw new BadRequestException('FIELD-0007');
      }
    }

    // calculate tax
    tax = calculateTax(subtotal, this.tax);
    total += tax;

    return {
      total: +total.toFixed(2),
      subtotal: subtotal,
      coupon: {
        id: coupon ? coupon.id : null,
        discount: coupon_discount,
      },
      tax: tax,
    };
  }
}
