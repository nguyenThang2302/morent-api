import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';
import { Location } from './location.entity';

@Entity('allow_dropoff_locations')
export class AllowDropoffLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, (car) => car.allow_dropoff_location)
  @JoinColumn({
    name: 'car_id',
    foreignKeyConstraintName: 'FK_AllowDropoffLocation_Car',
  })
  car: Car;

  @ManyToOne(() => Location, (location) => location.allow_dropoff_location)
  @JoinColumn({
    name: 'location_id',
    foreignKeyConstraintName: 'FK_AllowDropoffLocation_Location',
  })
  dropoff_location: Location;
}
