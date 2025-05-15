import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IFindOneUserService } from './interfaces/find-one-user.service.interface';
import {
  IFindOneUserRepository,
  IUser,
} from './interfaces/find-one-user.repository.interface';
import { FIND_ONE_USER_REPOSITORY } from './constants/find-one-user.module.constant';

@Injectable()
export class FindOneUserService implements IFindOneUserService {
  constructor(
    @Inject(FIND_ONE_USER_REPOSITORY)
    private readonly findAllUserRepository: IFindOneUserRepository,
  ) {}

  private ensureUserExists(
    user: IUser | null,
    id: string,
  ): asserts user is IUser {
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  public async execute(id: string): Promise<IUser | null> {
    const user = await this.findAllUserRepository.findOneById(id);

    this.ensureUserExists(user, id);

    return user;
  }
}
