import { IUser } from './find-one-user.repository.interface';

export interface IFindOneUserController {
  execute(id: string): Promise<IUser | null>;
}
