import { PaymentMethod } from 'src/api/order/entities/payment-method.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class PaymentMethod1709789684001 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query(`ALTER TABLE orders
    DROP FOREIGN KEY FK_Order_PaymentMethod;`);

    await dataSource.query('TRUNCATE TABLE payment_methods;');

    const paymentMethodRepository = dataSource.getRepository(PaymentMethod);

    await paymentMethodRepository.insert([{ name: 'paypal' }, { name: 'cod' }]);

    await dataSource.query(`ALTER TABLE orders
        ADD CONSTRAINT FK_Order_PaymentMethod
        FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ;`);
  }
}
