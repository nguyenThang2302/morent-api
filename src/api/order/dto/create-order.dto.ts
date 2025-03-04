import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { IsValidDate } from 'src/api/common/decorators/is-valid-date.decorator';

export class Items {
  @IsNotEmpty({ message: 'FIELD-0001' })
  id: string;

  @IsNotEmpty({ message: 'FIELD-0001' })
  price: number;

  @IsNotEmpty({ message: 'FIELD-0001' })
  sale_price: number;

  @IsNotEmpty({ message: 'FIELD-0001' })
  pickup_location_id: number;

  @IsNotEmpty({ message: 'FIELD-0001' })
  @Transform(({ value }) => new Date(value))
  pickup_date: Date;

  @IsNotEmpty({ message: 'FIELD-0001' })
  dropoff_location_id: number;

  @IsNotEmpty({ message: 'FIELD-0001' })
  @Transform(({ value }) => new Date(value))
  dropoff_date: Date;
}

export class CreateOrderDto {
  @IsNotEmpty({ message: 'FIELD-0001' })
  customer_name: string;

  @IsNotEmpty({ message: 'FIELD-0001' })
  phone_number: string;

  @IsNotEmpty({ message: 'FIELD-0001' })
  address: string;

  @IsNotEmpty({ message: 'FIELD-0001' })
  city: string;

  total: number;

  @IsOptional()
  coupon_code: string;

  @IsNotEmpty({ message: 'FIELD-0001' })
  payment_method_id: string;

  @ValidateNested({ each: true })
  // @IsValidDate({ message: 'FIELD-0013' })
  @Type(() => Items)
  items: Items[];
}
