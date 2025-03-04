import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';
import { Location } from './location.entity';

@Entity('allow_pickup_locations')
export class AllowPickupLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, (car) => car.allow_pickup_location)
  @JoinColumn({
    name: 'car_id',
    foreignKeyConstraintName: 'FK_AllowPickupLocation_Car',
  })
  car: Car;

  @ManyToOne(() => Location, (location) => location.allow_pickup_location)
  @JoinColumn({
    name: 'location_id',
    foreignKeyConstraintName: 'FK_AllowPickupLocation_Location',
  })
  pickup_location: Location;
}
