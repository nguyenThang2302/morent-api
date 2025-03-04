import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from './car.entity';
import { CarTypeTranslation } from './car-type-translation.entity';

@Entity('car_types')
export class CarType {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Car, (car) => car.car_type)
  car?: Car[];

  @OneToMany(
    () => CarTypeTranslation,
    (car_type_translation) => car_type_translation.car_type,
  )
  car_type_translation?: CarTypeTranslation[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
