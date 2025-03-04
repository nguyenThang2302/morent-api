import { LocationTranslation } from 'src/api/car/entities/location-translation.entity';
import { Location } from 'src/api/car/entities/location.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class Location1708364387567 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query(`ALTER TABLE order_details
    DROP FOREIGN KEY FK_PickUpOrderDetail_Location;`);

    await dataSource.query(`ALTER TABLE order_details
    DROP FOREIGN KEY FK_DropOffOrderDetail_Location;`);

    await dataSource.query(`ALTER TABLE allow_pickup_locations
    DROP FOREIGN KEY FK_AllowPickupLocation_Location;`);

    await dataSource.query(`ALTER TABLE allow_dropoff_locations
    DROP FOREIGN KEY FK_AllowDropoffLocation_Location;`);

    await dataSource.query(`ALTER TABLE location_translations
    DROP FOREIGN KEY FK_LocationTranslation_Location;`);

    await dataSource.query('TRUNCATE TABLE locations;');
    await dataSource.query('TRUNCATE TABLE location_translations;');

    const locationRepository = dataSource.getRepository(Location);
    const locationTranslationRepository =
      dataSource.getRepository(LocationTranslation);

    await locationRepository.insert([{ id: 1 }, { id: 2 }]);
    await locationTranslationRepository.insert([
      { name: 'Da Nang', language_code: 'en', location: { id: 1 } },
      { name: 'Đà Nẵng', language_code: 'vi', location: { id: 1 } },
      { name: 'Quang Nam', language_code: 'en', location: { id: 2 } },
      { name: 'Quảng Nam', language_code: 'vi', location: { id: 2 } },
    ]);

    await dataSource.query(`ALTER TABLE location_translations
    ADD CONSTRAINT FK_LocationTranslation_Location
    FOREIGN KEY (location_id) REFERENCES locations(id) ;`);

    await dataSource.query(`ALTER TABLE order_details
    ADD CONSTRAINT FK_PickUpOrderDetail_Location
    FOREIGN KEY (pickup_location_id) REFERENCES locations(id) ;`);

    await dataSource.query(`ALTER TABLE order_details
    ADD CONSTRAINT FK_DropOffOrderDetail_Location
    FOREIGN KEY (dropoff_location_id) REFERENCES locations(id) ;`);

    await dataSource.query(`ALTER TABLE allow_pickup_locations
    ADD CONSTRAINT FK_AllowPickupLocation_Location
    FOREIGN KEY (location_id) REFERENCES locations(id) ;`);

    await dataSource.query(`ALTER TABLE allow_dropoff_locations
    ADD CONSTRAINT FK_AllowDropoffLocation_Location
    FOREIGN KEY (location_id) REFERENCES locations(id) ;`);
  }
}
