import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user.controller';
import { CreateUserService } from './create-user.service';
import {
  CREATE_USER_REPOSITORY,
  CREATE_USER_SERVICE,
} from './constants/create-user.module.constant';
import { CreateUserRepository } from './repositories/create-user.repository';

@Module({
  controllers: [CreateUserController],
  providers: [
    {
      provide: CREATE_USER_SERVICE,
      useClass: CreateUserService,
    },
    {
      provide: CREATE_USER_REPOSITORY,
      useClass: CreateUserRepository,
    },
  ],
})
export class CreateUserModule {}
