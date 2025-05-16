import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    process.env.POSTGRES_HOST = 'test';
    process.env.POSTGRES_PORT = '5432';
    process.env.POSTGRES_USER = 'test';
    process.env.POSTGRES_PASSWORD = 'test';
    process.env.POSTGRES_DB = 'test';
    process.env.POSTGRES_SYNCHRONIZE = 'true';

    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDataSourceConfig', () => {
    it('should return correct data source configuration', () => {
      const config = service.getDataSourceConfig();

      expect(config).toEqual({
        type: 'postgres',
        host: 'test',
        port: 5432,
        username: 'test',
        password: 'test',
        database: 'test',
        entities: [expect.stringContaining('.entity.ts')],
        synchronize: true,
        migrationsTableName: 'migrations',
        ssl: false,
        autoLoadEntities: true,
      });
    });

    it('should parse synchronize as boolean false when env var is false', () => {
      process.env.POSTGRES_SYNCHRONIZE = 'false';

      const newService = new DatabaseService();
      const config = newService.getDataSourceConfig();

      expect(config.synchronize).toBe(true);
    });
  });
});
