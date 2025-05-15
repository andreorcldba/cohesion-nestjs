import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { IRemoveUserRepository } from '../interfaces/remove-user.repository.interface';

@Injectable()
export class RemoveUserRepository implements IRemoveUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  removeById(id: string) {
    return this.repository.delete(id);
  }
}
