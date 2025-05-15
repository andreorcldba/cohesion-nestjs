import { Module } from '@nestjs/common';
import { RemoveUserController } from './remove-user.controller';
import { RemoveUserService } from './remove-user.service';
import {
  REMOVE_USER_REPOSITORY,
  REMOVE_USER_SERVICE,
} from './constants/remove-user.module.constant';
import { RemoveUserRepository } from './repositories/remove-user.repository';

@Module({
  controllers: [RemoveUserController],
  providers: [
    {
      provide: REMOVE_USER_SERVICE,
      useClass: RemoveUserService,
    },
    {
      provide: REMOVE_USER_REPOSITORY,
      useClass: RemoveUserRepository,
    },
  ],
})
export class RemoveUserModule {}
