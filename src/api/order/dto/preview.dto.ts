import { Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { IsValidDate } from 'src/api/common/decorators/is-valid-date.decorator';

class Items {
  @IsOptional()
  id: number;

  @IsOptional()
  @Transform(({ value }) =>
    value === '' ? new Date(Date.now()) : new Date(value),
  )
  pickup_date: Date;

  @IsOptional()
  @Transform(({ value }) =>
    value === '' ? new Date(Date.now() + 1000 * 60 * 60 * 24) : new Date(value),
  )
  dropoff_date: Date;
}

export class PreviewDto {
  @ValidateNested({ each: true })
  // @IsValidDate({ message: 'FIELD-0013' })
  @Type(() => Items)
  items: Items[];

  @IsOptional()
  coupon_code: string;
}
