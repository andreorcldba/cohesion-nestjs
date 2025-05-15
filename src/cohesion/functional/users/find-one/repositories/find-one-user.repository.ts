import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { IFindOneUserRepository, IUser } from '../interfaces/find-one-user.repository.interface';

@Injectable()
export class FindOneUserRepository implements IFindOneUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  findOneById(id: string): Promise<IUser | null> {
    return this.repository.findOneBy({ id });
  }
}
