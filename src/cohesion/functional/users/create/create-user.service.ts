import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ICreateUserRepository,
  IUser,
} from './interfaces/create-user.repository.interface';
import { ICreateUserService } from './interfaces/create-user.service.interface';
import { CREATE_USER_REPOSITORY } from './constants/create-user.module.constant';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject(CREATE_USER_REPOSITORY)
    private readonly createUserRepository: ICreateUserRepository,
  ) {}

  /** Throws if no identifiers were returned */
  private ensureUserWasCreated(
    identifiers: unknown[],
  ): asserts identifiers is [Partial<IUser>, ...unknown[]] {
    if (!identifiers.length) {
      throw new InternalServerErrorException(
        'Error creating user, please try again later',
      );
    }
  }

  public async execute(createUserDto: CreateUserDto): Promise<Partial<IUser>> {
    const { identifiers } =
      await this.createUserRepository.insert(createUserDto);

    this.ensureUserWasCreated(identifiers);

    return identifiers[0];
  }
}
