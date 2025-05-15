import { Module } from '@nestjs/common';
import { FindOneUserService } from './find-one-user.service';
import { FindOneUserRepository } from './repositories/find-one-user.repository';
import { FindOneUserController } from './find-one-user.controller';
import {
  FIND_ONE_USER_REPOSITORY,
  FIND_ONE_USER_SERVICE,
} from './constants/find-one-user.module.constant';

@Module({
  controllers: [FindOneUserController],
  providers: [
    {
      provide: FIND_ONE_USER_SERVICE,
      useClass: FindOneUserService,
    },
    {
      provide: FIND_ONE_USER_REPOSITORY,
      useClass: FindOneUserRepository,
    },
  ],
})
export class FindOneUserModule {}
