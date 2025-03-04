import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CouponDto {
  @Expose()
  code: string;

  @Expose()
  type: string;

  @Expose()
  amount: number;

  @Expose()
  quantity: number;
}
