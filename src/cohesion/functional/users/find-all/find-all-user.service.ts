import { Inject, Injectable } from '@nestjs/common';
import { IFindAllUserService } from './interfaces/find-all-user.service.interface';
import {
  IFindAllUserRepository,
  IUser,
} from './interfaces/find-all-user.repository.interface';
import { FIND_ALL_USER_REPOSITORY } from './constants/find-all-user.module.constant';

@Injectable()
export class FindAllUserService implements IFindAllUserService {
  constructor(
    @Inject(FIND_ALL_USER_REPOSITORY)
    private readonly findAllUserRepository: IFindAllUserRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    return this.findAllUserRepository.find();
  }
}
