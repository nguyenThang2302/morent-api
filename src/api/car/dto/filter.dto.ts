import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsString({ message: 'FIELD-0002' })
  filter?: string;

  @IsOptional()
  @IsNumber({}, { each: true, message: 'FIELD-0002' })
  @Transform(({ value }) => (value === '' ? [] : value.split(',').map(Number)))
  type_ids?: number[];

  @IsOptional()
  @IsNumber({}, { each: true, message: 'FIELD-0002' })
  @Transform(({ value }) => (value === '' ? [] : value.split(',').map(Number)))
  capacities?: number[];

  @IsOptional()
  @IsNumber({}, { message: 'FIELD-0002' })
  @Transform(({ value }) => (value === '' ? null : parseFloat(value)))
  max_price?: number;

  @IsOptional()
  @IsString({ message: 'FIELD-0002' })
  search?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === '' ? new Date(Date.now()) : new Date(value),
  )
  pickup_date?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) =>
    value === ''
      ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
      : new Date(value),
  )
  dropoff_date?: Date;

  @IsOptional()
  @IsNumber({}, { message: 'FIELD-0002' })
  @Transform(({ value }) => (value === '' ? null : parseInt(value)))
  pickup_location_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'FIELD-0002' })
  @Transform(({ value }) => (value === '' ? null : parseInt(value)))
  dropoff_location_id?: number;
}
