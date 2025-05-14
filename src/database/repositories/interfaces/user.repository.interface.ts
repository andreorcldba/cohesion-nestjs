import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { User } from '../../entities/user.entity';

export interface IUsersRepository {
  insert(data: Partial<User>): Promise<InsertResult>;
  find(): Promise<User[]>;
  findOneById(id: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<UpdateResult>;
  removeById(id: string): Promise<DeleteResult>;
}
