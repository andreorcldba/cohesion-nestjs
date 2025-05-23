import { UpdateResult } from 'typeorm';

export interface IUser {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  password: string;
  remember_token: string;
}

export interface IUpdateUserRepository {
  update(id: string, data: Partial<IUser>): Promise<UpdateResult>;
}
