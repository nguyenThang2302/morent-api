import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from './car.entity';

@Entity('car_translations')
export class CarTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar' })
  name?: string;

  @Column({ type: 'nvarchar' })
  description?: string;

  @Column({ type: 'char', length: 2 })
  language_code?: string;

  @ManyToOne(() => Car, (car) => car.car_translation)
  @JoinColumn({
    name: 'car_id',
    foreignKeyConstraintName: 'FK_CarTranslation_Car',
  })
  car: Car;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
