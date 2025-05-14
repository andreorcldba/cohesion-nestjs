import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USERS_REPOSITORY } from 'src/database/constants/users-repository.token';
import { IUsersRepository } from 'src/database/repositories/interfaces/user.repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { identifiers } = await this.usersRepository.insert(createUserDto);

    if (!identifiers.length) {
      throw new InternalServerErrorException(
        'Error creating user, please try again later',
      );
    }

    return identifiers[0];
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.update(id, updateUserDto);

    if (!user.affected) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async remove(id: string) {
    const user = await this.usersRepository.removeById(id);

    if (!user.affected) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
