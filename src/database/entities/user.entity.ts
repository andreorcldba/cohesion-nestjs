import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  remember_token: string;
}
