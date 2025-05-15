import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ICreateUserRepository } from '../interfaces/create-user.repository.interface';

@Injectable()
export class CreateUserRepository implements ICreateUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public insert(user: Partial<User>) {
    return this.repository.insert(user);
  }
}
