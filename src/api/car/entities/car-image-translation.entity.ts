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
import { CarImage } from './car-image.entity';

@Entity('car_image_translations')
export class CarImageTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar' })
  title: string;

  @Column({ type: 'nvarchar' })
  content: string;

  @Column({ type: 'char', length: 2 })
  language_code: string;

  @ManyToOne(() => CarImage, (car_image) => car_image.car_image_translation)
  @JoinColumn({
    name: 'car_image_id',
    foreignKeyConstraintName: 'FK_CarImageTranslation_CarImage',
  })
  car_image: CarImage;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
