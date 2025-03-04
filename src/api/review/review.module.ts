import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { CarModule } from '../car/car.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), CarModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
