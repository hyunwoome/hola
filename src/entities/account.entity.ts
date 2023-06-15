import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { account_profile } from './account-profile.entity';

@Entity('account')
export class account {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => account_profile)
  @JoinColumn({ name: 'account_profile_id' })
  account_profile_id: number;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column({ length: 100, nullable: true })
  password: string;

  @Column({ length: 20, nullable: false })
  login_type: string;

  @Column({ type: 'timestamp', nullable: false })
  create_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  delete_date: Date;
}
