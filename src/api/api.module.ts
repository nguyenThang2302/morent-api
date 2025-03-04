import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { CarModule } from './car/car.module';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { IsEmailExistedConstraint } from './common/decorators/is-email-existed';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CarModule,
    AdminModule,
    OrderModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [
    IsEmailExistedConstraint,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class ApiModule {}
