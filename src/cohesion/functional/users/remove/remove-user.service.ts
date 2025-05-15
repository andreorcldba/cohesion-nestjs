import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IRemoveUserRepository } from './interfaces/remove-user.repository.interface';
import { IRemoveUserService } from './interfaces/remove-user.service.interface';
import { REMOVE_USER_REPOSITORY } from './constants/remove-user.module.constant';

@Injectable()
export class RemoveUserService implements IRemoveUserService {
  constructor(
    @Inject(REMOVE_USER_REPOSITORY)
    private readonly removeUserRepository: IRemoveUserRepository,
  ) {}

  private ensureUserRemoved(
    result: { affected?: number | null | undefined },
    id: string,
  ): asserts result is { affected: number } {
    if (!result?.affected) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  public async execute(id: string): Promise<void> {
    const result = await this.removeUserRepository.removeById(id);

    this.ensureUserRemoved(result, id);
  }
}
