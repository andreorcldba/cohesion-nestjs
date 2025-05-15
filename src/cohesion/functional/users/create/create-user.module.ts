import { Module } from '@nestjs/common';
import { CreateUsersController } from './create-user.controller';
import { CreateUserService } from './create-user.service';
import { CREATE_USER_SERVICE } from './constants/create-user-repository.token';

@Module({
  controllers: [CreateUsersController],
  providers: [
    CreateUserService,
    {
      provide: CREATE_USER_SERVICE,
      useClass: CreateUserService,
    },
  ],
})
export class CreateUserModule {}
