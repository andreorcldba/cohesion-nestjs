import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at: string;

  @CreateDateColumn({ type: 'timestamp' })
  public updated_at: string;

  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar' })
  @Exclude()
  public password: string;

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  public remember_token: string;
}
