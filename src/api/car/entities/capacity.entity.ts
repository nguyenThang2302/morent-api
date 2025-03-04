import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from './car.entity';

@Entity('capacities')
export class Capacity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slot?: number;

  @OneToMany(() => Car, (car) => car.capacity)
  car?: Car[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
