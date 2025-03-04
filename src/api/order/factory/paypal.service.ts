import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { IPayment } from './payment.interface';
import { ConfigService } from '@nestjs/config';
import { CreateOrderDto } from '../dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import { Repository } from 'typeorm';
import { ORDER_STATUS } from 'src/api/common/constants';
import { Order } from '../entities/order.entity';

@Injectable()
export class PaypalService implements IPayment {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async cancelOrder(orderID: number, paymentOrderID: string) {
    await this.updateStatusOrder(ORDER_STATUS.CANCELLED, orderID);

    return {
      payment_method_name: 'paypal',
      order_id: orderID,
      payment_order_id: paymentOrderID,
    };
  }

  async captureOrder(orderID: number, orderPaymentID: string) {
    const accessToken = await this.generateAccessToken(orderID);
    const url = `${this.configService.get<string>('paypal.paypal_url_base')}/v2/checkout/orders/${orderPaymentID}/capture`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const jsonResponse = await this.handleResponse(response, orderID);

    if (jsonResponse.status === 'COMPLETED') {
      await this.updateStatusOrder(ORDER_STATUS.PAID, orderID);

      return {
        payment_method_name: 'paypal',
        order_id: orderID,
        payment_order_id: orderPaymentID,
      };
    } else {
      throw new BadRequestException('PAY-0002');
    }
  }

  async processingPayment(order: CreateOrderDto, orderID: number) {
    const accessToken = await this.generateAccessToken(orderID);
    const url = `${this.configService.get<string>('paypal.paypal_url_base')}/v2/checkout/orders`;

    const payload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: order.total,
          },
        },
      ],
    };

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const jsonResponse = await this.handleResponse(response, orderID);
    await this.updatePaymentOrderID(jsonResponse.id, orderID);

    return {
      payment_method_name: 'paypal',
      order_id: orderID,
      payment_order_id: jsonResponse.id,
    };
  }

  async generateAccessToken(orderID: number) {
    try {
      if (
        !this.configService.get<string>('paypal.paypal_client_id') ||
        !this.configService.get<string>('paypal.paypal_client_secret')
      ) {
        throw new ServiceUnavailableException('PAY-0001');
      }

      const auth = Buffer.from(
        this.configService.get<string>('paypal.paypal_client_id') +
          ':' +
          this.configService.get<string>('paypal.paypal_client_secret'),
      ).toString('base64');

      const response = await fetch(
        `${this.configService.get<string>('paypal.paypal_url_base')}/v1/oauth2/token`,
        {
          method: 'POST',
          body: 'grant_type=client_credentials',
          headers: {
            Authorization: `Basic ${auth}`,
          },
        },
      );

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      await this.updateStatusOrder(ORDER_STATUS.CANCELLED, orderID);
      throw new BadRequestException('PAY-0001');
    }
  }

  async updatePaymentOrderID(paymentOrderID: string, orderID: number) {
    return await this.paymentRepository
      .createQueryBuilder('payments')
      .update(Payment)
      .set({ payment_order_id: paymentOrderID })
      .where('payments.order_id = :order_id', { order_id: orderID })
      .execute();
  }

  async updateStatusOrder(status: string, orderID: number) {
    return await this.paymentRepository
      .createQueryBuilder('orders')
      .update(Order)
      .set({ status: status })
      .where('orders.id = :order_id', { order_id: orderID })
      .execute();
  }

  async handleResponse(response: any, orderID: number) {
    try {
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (err) {
      await this.updateStatusOrder(ORDER_STATUS.CANCELLED, orderID);
      throw new BadRequestException('PAY-0001');
    }
  }
}
