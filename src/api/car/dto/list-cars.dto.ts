import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class ListCarsDto {
  @Expose()
  id: string;

  @Expose({ name: 'car_translation' })
  @Transform(({ value }) => value[0].name)
  name: string;

  @Expose({ name: 'car_image' })
  @Transform(({ value }) => value[0].image_url)
  thumbnail_url: string;

  @Expose({ name: 'steering' })
  @Transform(({ value }) => value.steering_translation[0].name)
  steering: string[];

  @Expose()
  gasoline: number;

  @Expose()
  price: number;

  @Expose()
  sale_price: number;

  @Expose({ name: 'capacity' })
  @Transform(({ value }) => value.slot)
  capacity: number;

  @Expose({ name: 'car_type' })
  @Transform(({ value }) => value.car_type_translation[0].name)
  type: string;
}
