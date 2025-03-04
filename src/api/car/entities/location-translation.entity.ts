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
import { Location } from './location.entity';

@Entity('location_translations')
export class LocationTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar' })
  name: string;

  @Column({ type: 'char', length: 2 })
  language_code: string;

  @ManyToOne(() => Location, (location) => location.location_translation)
  @JoinColumn({
    name: 'location_id',
    foreignKeyConstraintName: 'FK_LocationTranslation_Location',
  })
  location: Location;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
