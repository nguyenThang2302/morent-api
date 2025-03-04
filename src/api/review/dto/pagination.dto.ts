import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber({}, { message: 'ERR-0002' })
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsNumber({}, { message: 'ERR-0002' })
  @Type(() => Number)
  offset: number;
}
