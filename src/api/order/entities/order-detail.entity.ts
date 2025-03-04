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
import { Order } from './order.entity';
import { Car } from 'src/api/car/entities/car.entity';
import { Location } from 'src/api/car/entities/location.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  car_info?: object;

  @ManyToOne(() => Order, (order) => order.order_detail)
  @JoinColumn({
    name: 'order_id',
    foreignKeyConstraintName: 'FK_OrderDetail_Order',
  })
  order: Order;

  @ManyToOne(() => Location, (location) => location.pickup_order_detail)
  @JoinColumn({
    name: 'pickup_location_id',
    foreignKeyConstraintName: 'FK_PickUpOrderDetail_Location',
  })
  pickup_location: Location;

  @Column()
  pickup_date: Date;

  @ManyToOne(() => Location, (location) => location.dropoff_order_detail)
  @JoinColumn({
    name: 'dropoff_location_id',
    foreignKeyConstraintName: 'FK_DropOffOrderDetail_Location',
  })
  dropoff_location: Location;

  @Column()
  dropoff_date: Date;

  @ManyToOne(() => Car, (car) => car.order_detail)
  @JoinColumn({
    name: 'car_id',
    foreignKeyConstraintName: 'FK_OrderDetail_Car',
  })
  car: Car;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
