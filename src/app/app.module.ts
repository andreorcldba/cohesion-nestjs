import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { CreateUserModule } from 'src/cohesion/functional/users/create/create-user.module';
import { FindAllUserModule } from 'src/cohesion/functional/users/find-all/find-all-user.module';
import { FindOneUserModule } from 'src/cohesion/functional/users/find-one/find-one-user.module';
import { UpdateUserModule } from 'src/cohesion/functional/users/update/create-user.module';

@Module({
  imports: [
    DatabaseModule,
    CreateUserModule,
    FindAllUserModule,
    FindOneUserModule,
    UpdateUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
