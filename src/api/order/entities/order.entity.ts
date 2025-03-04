import { ORDER_STATUS } from 'src/api/common/constants';
import { User } from 'src/api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from './payment.entity';
import { OrderDetail } from './order-detail.entity';
import { PaymentMethod } from './payment-method.entity';
import { Coupon } from './coupon.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true, nullable: true })
  @Index('UNQ_OrderCode', { unique: true })
  code?: string;

  @Column()
  customer_name?: string;

  @Column({ type: 'char', length: 15 })
  phone_number?: string;

  @Column()
  address?: string;

  @Column()
  city?: string;

  @Column({ type: 'double' })
  subtotal?: number;

  @Column({ type: 'double', nullable: true })
  coupon_discount?: number;

  @Column({ type: 'double' })
  tax?: number;

  @Column({ type: 'double' })
  total?: number;

  @Column({ type: 'enum', enum: ORDER_STATUS, default: ORDER_STATUS.PENDING })
  status?: string;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'FK_Order_User' })
  @Index('IDX_Order_User')
  user: User;

  @ManyToOne(() => PaymentMethod, (payment_method) => payment_method.order)
  @JoinColumn({
    name: 'payment_method_id',
    foreignKeyConstraintName: 'FK_Order_PaymentMethod',
  })
  @Index('IDX_Order_PaymentMethod')
  payment_method: PaymentMethod;

  @OneToMany(() => Payment, (payment) => payment.order)
  payment: Payment[];

  @OneToMany(() => OrderDetail, (order_detail) => order_detail.order)
  order_detail: OrderDetail[];

  @ManyToOne(() => Coupon, (coupon) => coupon.order)
  @JoinColumn({
    name: 'coupon_id',
    foreignKeyConstraintName: 'FK_Order_Coupon',
  })
  coupon: Coupon;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
