import { Coupon } from 'src/api/order/entities/coupon.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class Coupon1709976115436 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const couponFactory = factoryManager.get(Coupon);
    await couponFactory.saveMany(10);
  }
}
