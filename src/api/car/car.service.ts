import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CarTagService } from './car-tag.service';
import { FilterDto } from './dto/filter.dto';
import { PaginationDto } from './dto/pagination.dto';
import { plainToInstance } from 'class-transformer';
import { ListCarsDto } from './dto/list-cars.dto';
import { OrderDetail } from '../order/entities/order-detail.entity';
import { OrderService } from '../order/order.service';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
    private readonly carTagsService: CarTagService,
    private readonly orderService: OrderService,
  ) {}

  async deleteOneCar(id: number): Promise<any> {
    try {
      const data = await this.findExistingCar(id);
      if (!data) {
        throw new BadRequestException('CUS-0404');
      }
      await this.carsRepository.softDelete(id);
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  async findExistingCar(id: number) {
    try {
      return await this.carsRepository.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  async getTags(lang: string) {
    try {
      const carTypes = await this.carTagsService.getTagsCarTypes(lang);
      const capacities = await this.carTagsService.getTagsCapacities();
      const priceRange = await this.carTagsService.getPriceRange();

      const tags = {
        types: carTypes,
        capacities: capacities,
        price_range: priceRange,
      };

      return tags;
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  async getDetailsCar(id: string, lang: string) {
    try {
      const carDetails = await this.carsRepository
        .createQueryBuilder('cars')
        .innerJoinAndSelect(
          'cars.car_translation',
          'car_translation',
          'car_translation.language_code = :language_code',
          { language_code: lang },
        )
        .innerJoin('cars.car_type', 'car_type')
        .innerJoinAndSelect(
          'car_type.car_type_translation',
          'car_type_translation',
          'car_type_translation.language_code = :language_code',
          { language_code: lang },
        )
        .innerJoinAndSelect('cars.capacity', 'capacity')
        .innerJoin('cars.steering', 'steering')
        .innerJoinAndSelect(
          'steering.steering_translation',
          'steering_translation',
          'steering_translation.language_code = :language_code',
          { language_code: lang },
        )
        .select([
          'cars.id as id',
          'car_translation.name as name',
          'car_translation.description as description',
          'cars.gasoline as gasoline',
          'cars.price as price',
          'cars.sale_price as sale_price',
          'cars.avg_rating as avg_rating',
          'car_type_translation.name as car_type',
          'capacity.slot as capacity',
          'steering_translation.name as steering',
        ])
        .where('cars.id = :id', { id: id })
        .getRawOne();
      const images = await this.carsRepository
        .createQueryBuilder('cars')
        .innerJoinAndSelect(
          'cars.car_image',
          'car_image',
          'car_image.is_thumbnail = :is_thumbnail',
          { is_thumbnail: false },
        )
        .innerJoinAndSelect(
          'car_image.car_image_translation',
          'car_image_translation',
          'car_image_translation.language_code = :language_code',
          { language_code: lang },
        )
        .select([
          'car_image.image_url as image_url',
          'car_image_translation.title as title',
          'car_image_translation.content as content',
        ])
        .where('cars.id = :id', { id: id })
        .limit(3)
        .getRawMany();
      if (!carDetails) {
        throw new BadRequestException('CUS-0404');
      }

      carDetails['images'] = images;

      return carDetails;
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  async getAllCars(query: FilterDto, pagination: PaginationDto, lang: string) {
    try {
      const {
        filter,
        type_ids,
        capacities,
        max_price,
        search = '',
        pickup_date,
        dropoff_date,
        pickup_location_id,
        dropoff_location_id,
      } = query;
      const { limit = 10, offset = 1 } = pagination;

      const queryBuilder = this.carsRepository.createQueryBuilder('cars');

      queryBuilder
        // Car
        .innerJoinAndSelect(
          'cars.car_translation',
          'car_translation',
          'car_translation.language_code = :language_code',
          { language_code: lang },
        )

        // Car Type
        .innerJoinAndSelect('cars.car_type', 'car_type')
        .innerJoinAndSelect(
          'car_type.car_type_translation',
          'car_type_translation',
          'car_type_translation.language_code = :language_code',
          { language_code: lang },
        )

        // Capacity
        .innerJoinAndSelect('cars.capacity', 'capacity')

        // Steering
        .innerJoinAndSelect('cars.steering', 'steering')
        .innerJoinAndSelect(
          'steering.steering_translation',
          'steering_translation',
          'steering_translation.language_code = :language_code',
          { language_code: lang },
        )

        // Images
        .innerJoinAndSelect(
          'cars.car_image',
          'car_image',
          'car_image.is_thumbnail = :is_thumbnail',
          { is_thumbnail: true },
        )

        // Search
        .where('car_translation.name like :search', { search: `%${search}%` })

        // Pagination
        .limit(limit)
        .offset(limit * (offset - 1));

      switch (filter) {
        case 'recommended':
          this.orderByRating(queryBuilder);
          break;

        case 'popular':
          this.orderByPopular(queryBuilder);
          break;

        default:
          queryBuilder.orderBy('cars.id', 'ASC');
          break;
      }

      if (type_ids && type_ids.length) {
        this.getByCarType(queryBuilder, type_ids);
      }

      if (capacities && capacities.length) {
        this.getBySlot(queryBuilder, capacities);
      }

      if (max_price) {
        this.getByPrice(queryBuilder, max_price);
      }

      if (pickup_date || dropoff_date) {
        queryBuilder.andWhere('cars.id NOT IN (:id)', {
          id: await this.orderService.getCarIdUnavailableByDate(
            pickup_date,
            dropoff_date,
          ),
        });
      }

      if (pickup_location_id || dropoff_location_id)
        this.getByLocation(
          queryBuilder,
          pickup_location_id,
          dropoff_location_id,
        );

      const items = plainToInstance(ListCarsDto, await queryBuilder.getMany());
      const total = await queryBuilder.getCount();

      return {
        items: items,
        pagination: { total: total, limit, offset },
      };
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  private orderByRating(queryBuilder: SelectQueryBuilder<Car>) {
    try {
      queryBuilder.orderBy('cars.avg_rating', 'DESC');
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  private getByCarType(
    queryBuilder: SelectQueryBuilder<Car>,
    type_ids: number[],
  ) {
    try {
      queryBuilder.andWhere('car_type.id IN (:type_ids)', {
        type_ids: type_ids,
      });
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  private getBySlot(
    queryBuilder: SelectQueryBuilder<Car>,
    capacities: number[],
  ) {
    try {
      queryBuilder.andWhere(
        `capacity.slot IN (:capacities)
      ${capacities.some((value) => value >= 8) ? 'OR capacity.slot >= 8' : ''}
      `,
        {
          capacities: capacities,
        },
      );
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  private getByPrice(queryBuilder: SelectQueryBuilder<Car>, max_price: number) {
    try {
      queryBuilder.andWhere(
        `CASE WHEN cars.sale_price IS NOT NULL 
            THEN cars.sale_price < :max_price 
            ELSE
            cars.price < :max_price
            END
            `,
        {
          max_price: max_price,
        },
      );
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  private orderByPopular(queryBuilder: SelectQueryBuilder<Car>) {
    try {
      queryBuilder
        .addSelect((subQuery) => {
          return subQuery
            .select('COUNT(*)', 'count')
            .from(OrderDetail, 'order_detail')
            .groupBy('order_detail.car_id')
            .where('cars.id = order_detail.car_id');
        }, 'totalOrder')
        .addOrderBy('totalOrder', 'DESC');
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  private getByLocation(
    queryBuilder: SelectQueryBuilder<Car>,
    pickup_location_id?: number,
    dropoff_location_id?: number,
  ) {
    try {
      if (pickup_location_id)
        queryBuilder.innerJoinAndSelect(
          'cars.allow_pickup_location',
          'allow_pickup_location',
          'allow_pickup_location.location_id = :pickup_location_id',
          { pickup_location_id: pickup_location_id },
        );

      if (dropoff_location_id)
        queryBuilder.innerJoinAndSelect(
          'cars.allow_dropoff_location',
          'allow_dropoff_location',
          'allow_dropoff_location.location_id = :dropoff_location_id',
          { dropoff_location_id: dropoff_location_id },
        );
    } catch (error) {
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }
}
