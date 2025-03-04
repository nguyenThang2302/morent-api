import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { CarService } from '../car/car.service';
import { format } from 'date-fns';
import * as moment from 'moment';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly carService: CarService,
  ) {}

  async getReviewsCar(carID: number, pagination: PaginationDto, lang: string) {
    const { limit = 3, offset = 1 } = pagination;

    const car = await this.carService.findExistingCar(carID);
    if (!car) {
      throw new BadRequestException('CUS-0505');
    }

    const queryBuilder = this.reviewRepository
      .createQueryBuilder('reviews')
      .innerJoinAndSelect('reviews.user', 'user')
      .innerJoinAndSelect('reviews.car', 'car', 'car.id = :id', { id: carID })
      .select([
        'user.id as user_id',
        'user.full_name as user_name',
        'user.avatar_url as avatar_url',
        'user.job as user_job',
        'reviews.content as content',
        'reviews.avg_rating as rating',
        'reviews.created_at as created_at',
      ])
      .limit(limit)
      .offset(limit * (offset - 1));

    const totalReviews = await queryBuilder.getCount();
    const dataReviews = await queryBuilder.getRawMany();

    dataReviews.map((data) => {
      const date = new Date(data.created_at);
      const originalDate = moment(format(date, 'yyyy-MM-dd'));
      const formattedDate = originalDate
        .locale(`${lang}`)
        .format('DD MMMM YYYY');
      data.created_at = formattedDate;
    });

    return {
      items: dataReviews,
      pagination: { total: totalReviews, limit: limit, offset: offset },
      total_review: totalReviews,
    };
  }
}
