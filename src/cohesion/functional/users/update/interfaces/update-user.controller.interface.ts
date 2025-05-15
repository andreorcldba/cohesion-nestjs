import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUpdateUserController {
  execute(id: string, updateUserDto: UpdateUserDto): Promise<void>;
}
