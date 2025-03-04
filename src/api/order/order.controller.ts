import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
  Put,
  Inject,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { PreviewDto } from './dto/preview.dto';
import { JwtAuthGuard } from '../common/guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtPayload } from 'jsonwebtoken';
import { PaginationDto } from '../car/dto/pagination.dto';
import { PaymentFactory } from './factory/payment.factory';
import { plainToInstance } from 'class-transformer';
import { OrderDetailDto } from './dto/order-detail.dto';

@UseGuards(JwtAuthGuard)
@Controller('v1')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    @Inject(PaymentFactory)
    private readonly paymentFactory: PaymentFactory,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('orders')
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return await this.orderService.create(createOrderDto, user.sub);
  }

  @HttpCode(HttpStatus.OK)
  @Post('orders/preview')
  preview(@Body() body: PreviewDto, @I18n() i18n: I18nContext) {
    return this.orderService.preview(body, i18n.lang);
  }

  @Post('orders/payments/:paymentOrderID/capture')
  async captureOrder(@Param('paymentOrderID') paymentOrderID: string) {
    const paymentMethodName =
      await this.orderService.getPaymentMethodNameByPaymentOrderID(
        paymentOrderID,
      );
    const orderID =
      await this.orderService.getOrderIDByPaypalOrderID(paymentOrderID);
    return await this.paymentFactory.createCaptureOrder(
      paymentMethodName,
      orderID,
      paymentOrderID,
    );
  }

  @Put('orders/payments/:paymentOrderID/cancel')
  async cancelOrder(@Param('paymentOrderID') paymentOrderID: string) {
    const paymentMethodName =
      await this.orderService.getPaymentMethodNameByPaymentOrderID(
        paymentOrderID,
      );
    const orderID =
      await this.orderService.getOrderIDByPaypalOrderID(paymentOrderID);
    return await this.paymentFactory.cancelOrder(
      paymentMethodName,
      orderID,
      paymentOrderID,
    );
  }

  @Get('orders')
  async getAllOrder(
    @CurrentUser() user: JwtPayload,
    @Query() pagination: PaginationDto,
  ) {
    return await this.orderService.getAllOrders(user.sub, pagination);
  }

  @Get('orders/:id')
  async getOrderDetail(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ): Promise<OrderDetailDto> {
    return plainToInstance(
      OrderDetailDto,
      await this.orderService.getOrderDetail(user.sub, id, i18n.lang),
    );
  }
}
