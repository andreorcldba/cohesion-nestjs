import { IUser } from './find-one-user.repository.interface';

export interface IFindOneUserService {
  execute(id: string): Promise<IUser | null>;
}
