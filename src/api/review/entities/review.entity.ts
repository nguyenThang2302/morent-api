import { Car } from 'src/api/car/entities/car.entity';
import { User } from 'src/api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.review)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK_Review_User',
  })
  user: User;

  @ManyToOne(() => Car, (car) => car.review)
  @JoinColumn({
    name: 'car_id',
    foreignKeyConstraintName: 'FK_Review_Car',
  })
  car: Car;

  @Column({ type: 'float' })
  avg_rating?: number;

  @Column()
  content?: string;

  @CreateDateColumn()
  created_at?: Date;
}
