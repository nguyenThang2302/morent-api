import { Exclude, Expose, Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import { I18nContext } from 'nestjs-i18n';

@Exclude()
export class ListOrderDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  total: number;

  @Expose({ name: 'payment_method' })
  @Transform(({ value }) => value.name)
  payment_method_name: string;

  @Expose()
  status: string;

  @Expose()
  @Transform(({ value }) =>
    dayjs(value).locale(I18nContext.current().lang).format('LL'),
  )
  created_at: Date;
}
