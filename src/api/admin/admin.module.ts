import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { CarModule } from '../car/car.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CarModule, UserModule],
  controllers: [AdminController],
})
export class AdminModule {}
