import { SteeringTranslation } from 'src/api/car/entities/steering-translation.entity';
import { Steering } from 'src/api/car/entities/steering.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class Steering1709146846240 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query(`ALTER TABLE cars
        DROP FOREIGN KEY FK_Car_Steering;`);

    await dataSource.query(`ALTER TABLE steering_translations
        DROP FOREIGN KEY FK_SteeringTranslation_Steering;`);

    await dataSource.query('TRUNCATE TABLE steerings;');
    await dataSource.query('TRUNCATE TABLE steering_translations;');

    const locationRepository = dataSource.getRepository(Steering);
    const locationTranslationRepository =
      dataSource.getRepository(SteeringTranslation);

    await locationRepository.insert([{ id: 1 }, { id: 2 }]);
    await locationTranslationRepository.insert([
      { name: 'Manual', language_code: 'en', steering: { id: 1 } },
      { name: 'Xe sàn', language_code: 'vi', steering: { id: 1 } },
      { name: 'Auto', language_code: 'en', steering: { id: 2 } },
      { name: 'Xe tự động', language_code: 'vi', steering: { id: 2 } },
    ]);

    await dataSource.query(`ALTER TABLE cars
        ADD CONSTRAINT FK_Car_Steering
        FOREIGN KEY (steering_id) REFERENCES steerings(id) ;`);

    await dataSource.query(`ALTER TABLE steering_translations
        ADD CONSTRAINT FK_SteeringTranslation_Steering
        FOREIGN KEY (steering_id) REFERENCES steerings(id) ;`);
  }
}
