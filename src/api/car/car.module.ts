import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { CarType } from './entities/car-type.entity';
import { CarTagService } from './car-tag.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Capacity } from './entities/capacity.entity';
import { CarImage } from './entities/car-image.entity';
import { CarImageTranslation } from './entities/car-image-translation.entity';
import { CarTranslation } from './entities/car-translation.entity';
import { CarTypeTranslation } from './entities/car-type-translation.entity';
import { Location } from './entities/location.entity';
import { LocationTranslation } from './entities/location-translation.entity';
import { Steering } from './entities/steering.entity';
import { SteeringTranslation } from './entities/steering-translation.entity';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Capacity,
      CarImage,
      CarImageTranslation,
      Car,
      CarTranslation,
      CarTypeTranslation,
      CarType,
      Location,
      LocationTranslation,
      Steering,
      SteeringTranslation,
    ]),
    UserModule,
    ConfigModule,
    OrderModule,
  ],
  controllers: [CarController],
  providers: [CarService, CarTagService],
  exports: [CarService, CarTagService],
})
export class CarModule {}
