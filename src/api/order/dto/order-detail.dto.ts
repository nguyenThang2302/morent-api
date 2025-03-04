import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import * as dayjs from 'dayjs';
import { I18nContext } from 'nestjs-i18n';

@Exclude()
class Items {
  @Expose()
  @Transform(({ obj }) => obj.car_info.id)
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.car_info.name)
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.car_info.thumbnail_url)
  thumbnail: string;

  @Expose()
  @Transform(({ obj }) => obj.car_info.price)
  price: number;

  @Expose()
  @Transform(({ obj }) => obj.car_info.sale_price)
  sale_price: number;

  @Expose()
  @Transform(({ value }) => value.location_translation[0].name)
  pickup_location: string;

  @Expose()
  @Transform(({ value }) =>
    dayjs(value).locale(I18nContext.current().lang).format('L'),
  )
  pickup_date: Date;

  @Expose()
  @Transform(({ value }) => value.location_translation[0].name)
  dropoff_location: string;

  @Expose()
  @Transform(({ value }) =>
    dayjs(value).locale(I18nContext.current().lang).format('L'),
  )
  dropoff_date: Date;
}

@Exclude()
export class OrderDetailDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  customer_name: string;

  @Expose()
  phone_number: string;

  @Expose()
  address: string;

  @Expose()
  city: string;

  @Expose({ name: 'payment_method' })
  @Transform(({ value }) => value.name)
  payment_method_name: string;

  @Expose()
  status: string;

  @Expose()
  subtotal: number;

  @Expose()
  @Transform(({ value }) => (value === null ? 0 : value))
  coupon_discount: number;

  @Expose()
  tax: number;

  @Expose()
  total: number;

  @Expose()
  @Transform(({ value }) =>
    dayjs(value).locale(I18nContext.current().lang).format('L'),
  )
  created_at: Date;

  @Expose({ name: 'order_detail' })
  @ValidateNested({ each: true })
  @Type(() => Items)
  items: Items[];
}
