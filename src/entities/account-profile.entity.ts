import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_profile')
export class account_profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, nullable: false })
  account_type: string;

  @Column({ length: 30, nullable: false })
  nickname: string;

  @Column({ length: 50, nullable: false })
  custom_email: string;

  @Column({ length: 300, nullable: true })
  language: string;

  @Column({ length: 30, nullable: true })
  position: string;

  @Column({ length: 30, nullable: true })
  affiliation: string;

  @Column({ length: 200, nullable: true })
  github_url: string;

  @Column({ length: 200, nullable: true })
  blog_url: string;

  @Column({ type: 'text', nullable: true })
  about_me: string;

  @Column({ type: 'timestamp', nullable: false })
  create_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  update_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  delete_date: Date;
}
