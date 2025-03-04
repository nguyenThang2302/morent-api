import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from './car.entity';
import { CarImageTranslation } from './car-image-translation.entity';

@Entity('car_images')
export class CarImage {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  image_url: string;

  @Column()
  is_thumbnail: boolean;

  @ManyToOne(() => Car, (car) => car.car_image)
  @JoinColumn({
    name: 'car_id',
    foreignKeyConstraintName: 'FK_CarImage_Car',
  })
  car?: Car;

  @OneToMany(
    () => CarImageTranslation,
    (car_image_translation) => car_image_translation.car_image,
  )
  car_image_translation?: CarImageTranslation[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
