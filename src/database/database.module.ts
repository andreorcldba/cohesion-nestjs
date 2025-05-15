import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { User } from './entities/user.entity';

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

  exports: [TypeOrmModule],
})
export class DatabaseModule {}
