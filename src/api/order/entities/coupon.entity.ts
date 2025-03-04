import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { COUPON_TYPE } from 'src/api/common/constants';
import { Order } from './order.entity';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 10 })
  code: string;

  @Column({ type: 'enum', enum: COUPON_TYPE })
  type: string;

  @Column({ type: 'double' })
  amount: number;

  @Column({ type: 'int' })
  quantity: number;

  @OneToMany(() => Order, (order) => order.coupon)
  order: Order;

  @Column()
  expired_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
