import { Controller, Get, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { PaginationDto } from './dto/pagination.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('v1')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('reviews')
  async getReviewsCar(
    @Query('car_id') carID: number,
    @Query() pagination: PaginationDto,
    @I18n() i18n: I18nContext,
  ) {
    return await this.reviewService.getReviewsCar(carID, pagination, i18n.lang);
  }
}
