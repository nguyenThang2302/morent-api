import { faker } from '@faker-js/faker';
import { AllowDropoffLocation } from 'src/api/car/entities/allow-dropoff-location.entity';
import { AllowPickupLocation } from 'src/api/car/entities/allow-pickup-location.entity';
import { CarImageTranslation } from 'src/api/car/entities/car-image-translation.entity';
import { CarImage } from 'src/api/car/entities/car-image.entity';
import { CarTranslation } from 'src/api/car/entities/car-translation.entity';
import { Car } from 'src/api/car/entities/car.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class Car1709147420986 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query(`ALTER TABLE allow_pickup_locations
    DROP FOREIGN KEY FK_AllowPickupLocation_Car;`);

    await dataSource.query(`ALTER TABLE allow_dropoff_locations
    DROP FOREIGN KEY FK_AllowDropoffLocation_Car;`);

    const carRepository = dataSource.getRepository(Car);
    const carTranslationRepository = dataSource.getRepository(CarTranslation);
    const carImageRepository = dataSource.getRepository(CarImage);
    const carImageTranslationRepository =
      dataSource.getRepository(CarImageTranslation);
    const allowPickupLocationRepository =
      dataSource.getRepository(AllowPickupLocation);
    const allowDropoffLocationRepository =
      dataSource.getRepository(AllowDropoffLocation);

    let count = (await carRepository.count()) + 1;
    const amount = count + 30 - 1;

    const userFactory = factoryManager.get(Car);
    await userFactory.saveMany(30);

    const name = faker.vehicle.vehicle();
    const desc = faker.commerce.productDescription();

    for (count; count <= amount; count++) {
      await allowPickupLocationRepository.insert([
        {
          car: { id: count },
          pickup_location: { id: 1 },
        },
        {
          car: { id: count },
          pickup_location: { id: 2 },
        },
      ]);

      await allowDropoffLocationRepository.insert([
        {
          car: { id: count },
          dropoff_location: { id: 1 },
        },
        {
          car: { id: count },
          dropoff_location: { id: 2 },
        },
      ]);

      await carTranslationRepository.insert([
        {
          name: name,
          description: desc,
          language_code: 'en',
          car: { id: count },
        },
        {
          name: name,
          description: desc,
          language_code: 'vi',
          car: { id: count },
        },
      ]);

      await carImageRepository.insert({
        image_url: 'https://i.imgur.com/8UZBC5I.png',
        is_thumbnail: true,
        car: { id: count },
      });

      const image2 = await carImageRepository.insert({
        image_url: 'https://i.imgur.com/5vatTNb.jpeg',
        is_thumbnail: false,
        car: { id: count },
      });

      await carImageTranslationRepository.insert([
        {
          title: 'Sports car with the best design and acceleration',
          content:
            'Safety and comfort while driving a futuristic and elegant sports car',
          language_code: 'en',
          car_image: { id: image2.generatedMaps[0].id },
        },
        {
          title: 'Xe thể thao với thiết kế và khả năng tăng tốc tốt nhất',
          content:
            'An toàn và thoải mái khi lái một chiếc xe thể thao thanh lịch và tương lai',
          language_code: 'vi',
          car_image: { id: image2.generatedMaps[0].id },
        },
      ]);

      const image3 = await carImageRepository.insert({
        image_url: 'https://i.imgur.com/rD9Q092.jpeg',
        is_thumbnail: false,
        car: { id: count },
      });

      await carImageTranslationRepository.insert([
        {
          title: 'Sports car with the best design and acceleration',
          content:
            'Safety and comfort while driving a futuristic and elegant sports car',
          language_code: 'en',
          car_image: { id: image3.generatedMaps[0].id },
        },
        {
          title: 'Xe thể thao với thiết kế và khả năng tăng tốc tốt nhất',
          content:
            'An toàn và thoải mái khi lái một chiếc xe thể thao thanh lịch và tương lai',
          language_code: 'vi',
          car_image: { id: image3.generatedMaps[0].id },
        },
      ]);

      const image4 = await carImageRepository.insert({
        image_url: 'https://i.imgur.com/9XTSWQy.jpeg',
        is_thumbnail: false,
        car: { id: count },
      });

      await carImageTranslationRepository.insert([
        {
          title: 'Sports car with the best design and acceleration',
          content:
            'Safety and comfort while driving a futuristic and elegant sports car',
          language_code: 'en',
          car_image: { id: image4.generatedMaps[0].id },
        },
        {
          title: 'Xe thể thao với thiết kế và khả năng tăng tốc tốt nhất',
          content:
            'An toàn và thoải mái khi lái một chiếc xe thể thao thanh lịch và tương lai',
          language_code: 'vi',
          car_image: { id: image4.generatedMaps[0].id },
        },
      ]);
    }

    await dataSource.query(`ALTER TABLE allow_pickup_locations
    ADD CONSTRAINT FK_AllowPickupLocation_Car
    FOREIGN KEY (car_id) REFERENCES cars(id) ;`);

    await dataSource.query(`ALTER TABLE allow_dropoff_locations
    ADD CONSTRAINT FK_AllowDropoffLocation_Car
    FOREIGN KEY (car_id) REFERENCES cars(id) ;`);
  }
}
