import { Module } from '@nestjs/common';
import {
  FIND_ALL_USER_REPOSITORY,
  FIND_ALL_USER_SERVICE,
} from './constants/find-all-user.module.constant';
import { FindAllUserService } from './find-all-user.service';
import { FindAllUserController } from './find-all-user.controller';
import { FindAllUserRepository } from './repositories/find-all-user.repository';

@Module({
  controllers: [FindAllUserController],
  providers: [
    {
      provide: FIND_ALL_USER_SERVICE,
      useClass: FindAllUserService,
    },
    {
      provide: FIND_ALL_USER_REPOSITORY,
      useClass: FindAllUserRepository,
    },
  ],
})
export class FindAllUserModule {}
