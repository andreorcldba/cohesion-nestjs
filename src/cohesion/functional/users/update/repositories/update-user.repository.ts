import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { IUpdateUserRepository } from '../interfaces/update-user.repository.interface';

@Injectable()
export class UpdateUserRepository implements IUpdateUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  update(id: string, user: Partial<User>) {
    return this.repository.update(id, user);
  }
}
