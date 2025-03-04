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
import { CarType } from './car-type.entity';

@Entity('car_type_translations')
export class CarTypeTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar' })
  name: string;

  @Column({ type: 'char', length: 2 })
  language_code: string;

  @ManyToOne(() => CarType, (car_type) => car_type.car_type_translation)
  @JoinColumn({
    name: 'car_type_id',
    foreignKeyConstraintName: 'FK_CarTypeTranslation_CarType',
  })
  car_type: CarType;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
