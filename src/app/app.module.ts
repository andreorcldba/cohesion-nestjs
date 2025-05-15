import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { CreateUserModule } from 'src/cohesion/functional/users/create/create-user.module';

@Module({
  imports: [DatabaseModule, CreateUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
