import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repository';
import { USERS_REPOSITORY } from './constants/users-repository.token';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRootAsync({
      inject: [DatabaseService],
      extraProviders: [DatabaseService],
      useFactory: (databaseService: DatabaseService) =>
        databaseService.getDataSourceConfig(),
    }),
  ],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  exports: [TypeOrmModule, USERS_REPOSITORY],
})
export class DatabaseModule {}
