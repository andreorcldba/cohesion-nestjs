import { Module } from '@nestjs/common';
import { UpdateUserController } from './update-user.controller';
import { UpdateUserService } from './update-user.service';
import {
  UPDATE_USER_REPOSITORY,
  UPDATE_USER_SERVICE,
} from './constants/update-user.module.constant';
import { UpdateUserRepository } from './repositories/update-user.repository';

@Module({
  controllers: [UpdateUserController],
  providers: [
    {
      provide: UPDATE_USER_SERVICE,
      useClass: UpdateUserService,
    },
    {
      provide: UPDATE_USER_REPOSITORY,
      useClass: UpdateUserRepository,
    },
  ],
})
export class UpdateUserModule {}
