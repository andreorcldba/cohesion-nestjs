import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { IUsersRepository } from './interfaces/user.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  insert(user: Partial<User>) {
    return this.repository.insert(user);
  }

  find() {
    return this.repository.find();
  }

  findOneById(id: string) {
    return this.repository.findOneBy({ id });
  }

  update(id: string, user: Partial<User>) {
    return this.repository.update(id, user);
  }

  removeById(id: string) {
    return this.repository.delete(id);
  }
}
