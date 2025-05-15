import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { USERS_REPOSITORY } from 'src/database/constants/users-repository.token';
import {
  ICreateUserRepository,
  IUser,
} from './interfaces/create-user.repository.interface';
import { ICreateUserService } from './interfaces/create-user.service.interface';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: ICreateUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<Partial<IUser>> {
    const { identifiers } = await this.usersRepository.insert(createUserDto);

    if (!identifiers.length) {
      throw new InternalServerErrorException(
        'Error creating user, please try again later',
      );
    }

    return identifiers[0] as Partial<IUser>;
  }
}
