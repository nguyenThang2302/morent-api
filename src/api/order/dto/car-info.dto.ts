import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class CarInfoDto {
  @Expose()
  id: string;

  @Expose({ name: 'car_translation' })
  @Transform(({ value }) => value[0].name)
  name: string;

  @Expose({ name: 'car_image' })
  @Transform(({ value }) => value[0].image_url)
  thumbnail_url: string;

  @Expose()
  price: number;

  @Expose()
  sale_price: number;

  @Expose()
  avg_rating: number;
}
