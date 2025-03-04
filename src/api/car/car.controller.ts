import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CarService } from './car.service';
import { FilterDto } from './dto/filter.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('v1')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @HttpCode(HttpStatus.OK)
  @Get('car-tags')
  async getCarTasg(@I18n() i18n: I18nContext) {
    return await this.carService.getTags(i18n.lang);
  }

  @Get('cars/:id')
  async findOne(@Param('id') id: string, @I18n() i18n: I18nContext) {
    return await this.carService.getDetailsCar(id, i18n.lang);
  }

  @Get('cars')
  async getAllCars(
    @Query() query: FilterDto,
    @Query() pagination: PaginationDto,
    @I18n() i18n: I18nContext,
  ) {
    return await this.carService.getAllCars(query, pagination, i18n.lang);
  }
}
