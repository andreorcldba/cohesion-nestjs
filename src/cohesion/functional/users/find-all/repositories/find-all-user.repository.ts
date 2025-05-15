import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { IFindAllUserRepository } from '../interfaces/find-all-user.repository.interface';

@Injectable()
export class FindAllUserRepository implements IFindAllUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public find() {
    return this.repository.find();
  }
}
