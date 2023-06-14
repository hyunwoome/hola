import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountProfile } from './account-profile.entity';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => AccountProfile)
  @JoinColumn()
  accountProfileId: number;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column({ length: 20, nullable: false })
  loginType: string;

  @Column({ type: 'timestamp', nullable: false })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleteDate: Date;
}
