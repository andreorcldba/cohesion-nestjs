import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUpdateUserRepository } from './interfaces/update-user.repository.interface';
import { IUpdateUserService } from './interfaces/update-user.service.interface';
import { UPDATE_USER_REPOSITORY } from './constants/update-user.module.constant';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UpdateUserService implements IUpdateUserService {
  constructor(
    @Inject(UPDATE_USER_REPOSITORY)
    private readonly updateUserRepository: IUpdateUserRepository,
  ) {}

  private ensureUserUpdated(
    result: { affected?: number },
    id: string,
  ): asserts result is { affected: number } {
    if (!result.affected) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  public async execute(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const result = await this.updateUserRepository.update(id, updateUserDto);

    this.ensureUserUpdated(result, id);
  }
}
