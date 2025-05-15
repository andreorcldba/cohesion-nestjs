import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUpdateUserService {
  execute(id: string, updateUserDto: UpdateUserDto): Promise<void>;
}
