import { Capacity } from 'src/api/car/entities/capacity.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class Capacity1708364736310 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query(`ALTER TABLE cars
        DROP FOREIGN KEY FK_Car_Capacity;`);

    await dataSource.query('TRUNCATE TABLE capacities;');

    const capacityRepository = dataSource.getRepository(Capacity);
    await capacityRepository.insert([
      { slot: 2 },
      { slot: 4 },
      { slot: 6 },
      { slot: 8 },
      { slot: 10 },
      { slot: 12 },
    ]);

    await dataSource.query(`ALTER TABLE cars
    ADD CONSTRAINT FK_Car_Capacity
    FOREIGN KEY (capacity_id) REFERENCES capacities(id);`);
  }
}
