import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarType } from './entities/car-type.entity';
import { Capacity } from './entities/capacity.entity';
import { Car } from './entities/car.entity';

@Injectable()
export class CarTagService {
  constructor(
    @InjectRepository(CarType)
    private typesRepository: Repository<CarType>,
    @InjectRepository(Capacity)
    private capacitiesRepository: Repository<Capacity>,
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  async getTagsCarTypes(lang: string) {
    const listType = [];

    const types = await this.typesRepository
      .createQueryBuilder('car_types')
      .innerJoinAndSelect(
        'car_types.car_type_translation',
        'car_type_translation',
        'car_type_translation.language_code = :language_code',
        { language_code: lang },
      )
      .select(['car_types.id as id', 'car_type_translation.name as name'])
      .orderBy('car_types.id', 'ASC')
      .getRawMany();

    await Promise.all(
      types.map(async (type) => {
        const typeId = type.id;
        const carTotalByType = await this.carsRepository
          .createQueryBuilder('cars')
          .innerJoin('car_types', 't', 'cars.car_type_id = t.id')
          .where('t.id = :type_id', { type_id: typeId })
          .orderBy('cars.id', 'ASC')
          .getCount();
        listType.push({
          id: typeId,
          name: type.name,
          total: carTotalByType,
        });
      }),
    );
    listType.sort((a, b) => a.id - b.id);

    return listType;
  }

  async getTagsCapacities() {
    const listCapacity = [];

    const capacities = await this.capacitiesRepository.find();
    await Promise.all(
      capacities.map(async (capacity) => {
        const capacityId = capacity.id;
        const carTotalByCapacity = await this.carsRepository
          .createQueryBuilder('cars')
          .innerJoin('capacities', 'c', 'cars.capacity_id = c.id')
          .where('c.id = :capacity_id', { capacity_id: capacityId })
          .groupBy('cars.id')
          .getCount();
        listCapacity.push({
          id: capacityId,
          name: capacity.slot,
          total: carTotalByCapacity,
        });
      }),
    );
    listCapacity.sort((a, b) => a.id - b.id);

    return listCapacity;
  }

  async getPriceRange() {
    const priceRange = await this.carsRepository
      .createQueryBuilder('cars')
      .select('FLOOR(MIN(cars.price))', 'min')
      .addSelect('CEIL(MAX(cars.price))', 'max')
      .getRawOne();

    return priceRange;
  }
}
