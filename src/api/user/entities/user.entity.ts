import { AccessToken } from 'src/api/auth/entities/access-token.entity';
import { RefreshToken } from 'src/api/auth/entities/refresh-token.entity';
import { ROLE } from 'src/api/common/constants';
import { Order } from 'src/api/order/entities/order.entity';
import { Review } from 'src/api/review/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar' })
  full_name: string;

  @Column()
  job: string;

  @Column()
  avatar_url: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column()
  hashed_password: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE;

  @OneToMany(() => AccessToken, (access_token) => access_token.user)
  access_tokens: AccessToken[];

  @OneToMany(() => AccessToken, (refresh_token) => refresh_token.user)
  refresh_token: RefreshToken[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @OneToMany(() => Review, (review) => review.user)
  review?: Review[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
