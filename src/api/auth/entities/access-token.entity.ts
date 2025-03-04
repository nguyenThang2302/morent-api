import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/api/user/entities/user.entity';
import { RefreshToken } from './refresh-token.entity';

@Entity('access_tokens')
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expired_at: Date;

  @ManyToOne(() => User, (user) => user.access_tokens)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK_AccessToken_User',
  })
  user: User;

  @OneToOne(() => RefreshToken, (refresh_token) => refresh_token.access_token)
  refresh_token: RefreshToken;

  @CreateDateColumn()
  created_at?: Date;
}
