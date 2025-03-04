import { CarTypeTranslation } from 'src/api/car/entities/car-type-translation.entity';
import { CarType } from 'src/api/car/entities/car-type.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class CarType1708364771084 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query(`ALTER TABLE cars 
    DROP FOREIGN KEY FK_Car_CarType;`);

    await dataSource.query(`ALTER TABLE car_type_translations
    DROP FOREIGN KEY FK_CarTypeTranslation_CarType;`);

    await dataSource.query('TRUNCATE TABLE car_types;');
    await dataSource.query('TRUNCATE TABLE car_type_translations;');

    const carTypeRepository = dataSource.getRepository(CarType);
    const carTypeTranslationRepository =
      dataSource.getRepository(CarTypeTranslation);

    await carTypeRepository.insert([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ]);
    await carTypeTranslationRepository.insert([
      { name: 'Sport', language_code: 'en', car_type: { id: 1 } },
      { name: 'Thể Thao', language_code: 'vi', car_type: { id: 1 } },
      { name: 'SUV', language_code: 'en', car_type: { id: 2 } },
      { name: 'Thể Thao Đa Dụng', language_code: 'vi', car_type: { id: 2 } },
      { name: 'MPV', language_code: 'en', car_type: { id: 3 } },
      { name: 'Đa Dụng', language_code: 'vi', car_type: { id: 3 } },
      { name: 'Sedan', language_code: 'en', car_type: { id: 4 } },
      { name: 'Sedan', language_code: 'vi', car_type: { id: 4 } },
      { name: 'Coupe', language_code: 'en', car_type: { id: 5 } },
      { name: 'Coupe', language_code: 'vi', car_type: { id: 5 } },
      { name: 'Hatchback', language_code: 'en', car_type: { id: 6 } },
      { name: 'Hatchback', language_code: 'vi', car_type: { id: 6 } },
    ]);

    await dataSource.query(`ALTER TABLE cars
    ADD CONSTRAINT FK_Car_CarType
    FOREIGN KEY (car_type_id) REFERENCES car_types(id);`);

    await dataSource.query(`ALTER TABLE car_type_translations
    ADD CONSTRAINT FK_CarTypeTranslation_CarType
    FOREIGN KEY (car_type_id) REFERENCES car_types(id);`);
  }
}
