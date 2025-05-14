import { Injectable } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseService {
  private ssl: boolean = false;
  private migrationTableName: string = 'migrations';
  private migrations: string[] = [];
  private synchronize: boolean = Boolean(process.env.POSTGRES_SYNCHRONIZE);

  getDataSourceConfig() {
    const datasourceConfig: DataSourceOptions & { autoLoadEntities: true } = {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '../**/*.entity.ts'],
      synchronize: this.synchronize,
      migrations: this.migrations,
      migrationsTableName: this.migrationTableName,
      ssl: this.ssl,
      autoLoadEntities: true,
    };

    return datasourceConfig;
  }
}
