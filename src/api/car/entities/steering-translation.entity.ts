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
import { Steering } from './steering.entity';

@Entity('steering_translations')
export class SteeringTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar' })
  name: string;

  @Column({ type: 'char', length: 2 })
  language_code: string;

  @ManyToOne(() => Steering, (steering) => steering.steering_translation)
  @JoinColumn({
    name: 'steering_id',
    foreignKeyConstraintName: 'FK_SteeringTranslation_Steering',
  })
  steering: Steering;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
