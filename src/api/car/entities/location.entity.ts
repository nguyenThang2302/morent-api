import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocationTranslation } from './location-translation.entity';
import { OrderDetail } from 'src/api/order/entities/order-detail.entity';
import { AllowPickupLocation } from './allow-pickup-location.entity';
import { AllowDropoffLocation } from './allow-dropoff-location.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => LocationTranslation,
    (location_translation) => location_translation.location,
  )
  location_translation?: LocationTranslation[];

  @OneToMany(
    () => OrderDetail,
    (pickup_order_detail) => pickup_order_detail.pickup_location,
  )
  pickup_order_detail?: OrderDetail[];

  @OneToMany(
    () => OrderDetail,
    (dropoff_order_detail) => dropoff_order_detail.dropoff_location,
  )
  dropoff_order_detail?: OrderDetail[];

  @OneToMany(
    () => AllowPickupLocation,
    (allow_pickup_location) => allow_pickup_location.pickup_location,
  )
  allow_pickup_location?: AllowPickupLocation[];

  @OneToMany(
    () => AllowDropoffLocation,
    (allow_dropoff_location) => allow_dropoff_location.dropoff_location,
  )
  allow_dropoff_location?: AllowDropoffLocation[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
