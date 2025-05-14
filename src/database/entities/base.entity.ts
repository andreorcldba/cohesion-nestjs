import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity('users')
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Timestamp;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at: Timestamp;
}
