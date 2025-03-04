import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaypalService } from './paypal.service';
import { CodService } from './cod.service';
import { PaymentFactory } from './payment.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import { Order } from '../entities/order.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Payment, Order])],
  controllers: [],
  providers: [PaypalService, CodService, PaymentFactory],
  exports: [PaypalService, CodService, PaymentFactory],
})
export class FactoryModule {}
