import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccessToken } from './access-token.entity';
import { User } from 'src/api/user/entities/user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expired_at: Date;

  @ManyToOne(() => User, (user) => user.refresh_token)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK_RefreshToken_User',
  })
  user: User;

  @OneToOne(() => AccessToken, (access_token) => access_token.refresh_token, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'access_token_id',
    foreignKeyConstraintName: 'FK_RefreshToken_AccessToken',
  })
  @Index('UNQ_RefreshToken_AccessToken', { unique: true })
  access_token: AccessToken;

  @CreateDateColumn()
  created_at?: Date;
}
