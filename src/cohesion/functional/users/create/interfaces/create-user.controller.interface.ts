import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from './create-user.repository.interface';

export interface ICreateUserController {
  execute(createUserDto: CreateUserDto): Promise<Partial<IUser>>;
}
