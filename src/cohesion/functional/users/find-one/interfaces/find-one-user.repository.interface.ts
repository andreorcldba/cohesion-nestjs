export interface IUser {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  password: string;
  remember_token: string | null;
}

export interface IFindOneUserRepository {
  findOneById(id: string): Promise<IUser | null>;
}
