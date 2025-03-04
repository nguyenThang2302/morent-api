import { Injectable } from '@nestjs/common';
import { IPayment } from './payment.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CodService implements IPayment {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  cancelOrder(orderID: number, paymentOrderID: string) {
    throw new Error('Method not implemented.');
  }

  captureOrder(orderID: number, orderPaymentID: string) {
    throw new Error('Method not implemented.');
  }

  processingPayment(order: CreateOrderDto, orderID: number) {
    this.orderRepository.update(orderID, { status: 'open' });

    return {
      payment_method_name: 'cod',
      order_id: orderID,
      payment_order_id: null,
    };
  }
}
