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

import { CarTranslation } from './car-translation.entity';
import { Steering } from './steering.entity';
import { CarType } from './car-type.entity';
import { CarImage } from './car-image.entity';
import { Capacity } from './capacity.entity';
import { OrderDetail } from 'src/api/order/entities/order-detail.entity';
import { AllowPickupLocation } from './allow-pickup-location.entity';
import { AllowDropoffLocation } from './allow-dropoff-location.entity';
import { Review } from 'src/api/review/entities/review.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  gasoline?: number;

  @Column({ type: 'double' })
  price?: number;

  @Column({ type: 'double' })
  sale_price?: number;

  @Column({ type: 'float' })
  avg_rating?: number;

  @OneToMany(() => CarTranslation, (car_translation) => car_translation.car)
  car_translation: CarTranslation[];

  @OneToMany(() => Review, (review) => review.car)
  review: Review[];

  @ManyToOne(() => Capacity, (capacity) => capacity.car)
  @JoinColumn({
    name: 'capacity_id',
    foreignKeyConstraintName: 'FK_Car_Capacity',
  })
  capacity: Capacity;

  @ManyToOne(() => Steering, (steering) => steering.car)
  @JoinColumn({
    name: 'steering_id',
    foreignKeyConstraintName: 'FK_Car_Steering',
  })
  steering: Steering;

  @ManyToOne(() => CarType, (car_type) => car_type.car)
  @JoinColumn({
    name: 'car_type_id',
    foreignKeyConstraintName: 'FK_Car_CarType',
  })
  car_type: CarType;

  @OneToMany(() => CarImage, (car_image) => car_image.car)
  car_image: CarImage[];

  @OneToMany(
    () => AllowPickupLocation,
    (allow_pickup_location) => allow_pickup_location.car,
  )
  allow_pickup_location: AllowPickupLocation[];

  @OneToMany(
    () => AllowDropoffLocation,
    (allow_dropoff_location) => allow_dropoff_location.car,
  )
  allow_dropoff_location: AllowDropoffLocation[];

  @OneToMany(() => OrderDetail, (order_detail) => order_detail.car)
  order_detail: OrderDetail[];

  orderCount: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
