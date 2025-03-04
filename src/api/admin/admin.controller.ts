import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CarService } from '../car/car.service';
import { Roles } from '../common/decorators/roles.decorator';
import { ROLE } from '../common/constants';
import { JwtAuthGuard, RolesGuard } from '../common/guard';

@Controller('admin/v1')
export class AdminController {
  constructor(private readonly carService: CarService) {}

  @Roles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('cars/:id')
  async deleteCar(@Param('id') id: string) {
    return await this.carService.deleteOneCar(parseInt(id));
  }
}
