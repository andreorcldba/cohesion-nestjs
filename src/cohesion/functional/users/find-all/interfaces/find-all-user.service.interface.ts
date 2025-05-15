import { IUser } from './find-all-user.repository.interface';

export interface IFindAllUserService {
  execute(): Promise<IUser[]>;
}
