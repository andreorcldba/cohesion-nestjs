import { DeleteResult } from 'typeorm';

export interface IUser {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  password: string;
  remember_token: string;
}

export interface IRemoveUserRepository {
  removeById(id: string): Promise<DeleteResult>;
}
