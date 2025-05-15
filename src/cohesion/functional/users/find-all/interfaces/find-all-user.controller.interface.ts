import { IUser } from './find-all-user.repository.interface';

export interface IFindAllUserController {
  execute(): Promise<IUser[]>;
}
