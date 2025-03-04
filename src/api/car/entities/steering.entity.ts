import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from './car.entity';
import { SteeringTranslation } from './steering-translation.entity';

@Entity('steerings')
export class Steering {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Car, (car) => car.steering)
  car?: Car[];

  @OneToMany(
    () => SteeringTranslation,
    (steering_translation) => steering_translation.steering,
  )
  steering_translation?: SteeringTranslation[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
