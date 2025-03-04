import { COUPON_TYPE } from 'src/api/common/constants';
import { Coupon } from 'src/api/order/entities/coupon.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Coupon, (faker) => {
  const coupon = new Coupon();

  coupon.code = faker.string.nanoid(10);
  coupon.type = faker.helpers.enumValue(COUPON_TYPE);
  coupon.amount = faker.number.int({ min: 10, max: 20 });
  coupon.quantity = faker.number.int({ min: 1, max: 20 });
  coupon.expired_at = faker.date.between({
    from: new Date('03-10-2024'),
    to: new Date('03-15-2024'),
  });

  return coupon;
});
