import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_profile')
export class AccountProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, nullable: false })
  accountType: string;

  @Column({ length: 30, nullable: false })
  nickname: string;

  @Column({ length: 50, nullable: false })
  customEmail: string;

  @Column({ length: 300, nullable: true })
  language: string;

  @Column({ length: 30, nullable: true })
  position: string;

  @Column({ length: 30, nullable: true })
  affiliation: string;

  @Column({ length: 200, nullable: true })
  githubUrl: string;

  @Column({ length: 200, nullable: true })
  blogUrl: string;

  @Column({ type: 'text', nullable: true })
  aboutMe: string;

  @Column({ type: 'timestamp', nullable: false })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  updateDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleteDate: Date;
}
