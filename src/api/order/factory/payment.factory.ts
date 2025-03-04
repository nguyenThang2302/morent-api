import { Injectable, Scope } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { CodService } from './cod.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable({ scope: Scope.REQUEST })
export class PaymentFactory {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly codService: CodService,
  ) {}

  createPaymentMethod(method: string, order: CreateOrderDto, orderID: number) {
    switch (method) {
      case 'paypal':
        return this.paypalService.processingPayment(order, orderID);
      case 'cod':
        return this.codService.processingPayment(order, orderID);
      default:
        throw new Error('Invalid implementation payment');
    }
  }

  createCaptureOrder(method: string, orderID: number, paymentOrderID: string) {
    switch (method) {
      case 'paypal':
        return this.paypalService.captureOrder(orderID, paymentOrderID);
      default:
        throw new Error('Invalid implementation payment');
    }
  }

  cancelOrder(method: string, orderID: number, paymentOrderID: string) {
    switch (method) {
      case 'paypal':
        return this.paypalService.cancelOrder(orderID, paymentOrderID);
      default:
        throw new Error('Invalid implementation payment');
    }
  }
}
