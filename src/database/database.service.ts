import { Injectable } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseService {
  private ssl: boolean = false;
  private migrationTableName: string = 'migrations';
  private migrations: string[] = [];
  private synchronize: boolean = false;
  private autoLoadEntities: boolean = true;
  private logging: boolean = false;

  getDataSourceConfig() {
    const datasourceConfig: DataSourceOptions = {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '../**/*.entity{.ts}'],
      synchronize: this.synchronize,
      migrations: this.migrations,
      migrationsTableName: this.migrationTableName,
      ssl: this.ssl,
    };

    return {
      ...datasourceConfig,
      autoLoadEntities: this.autoLoadEntities,
      logging: this.logging,
    };
  }
}
