import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserRepository } from '../repositories/create-user.repository';
import { User } from '../entities/user.entity';

describe('CreateUserRepository', () => {
  let repository: CreateUserRepository;
  let typeormRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<CreateUserRepository>(CreateUserRepository);
    typeormRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(typeormRepository).toBeDefined();
  });

  it('should call repository.insert with user partial and return result', async () => {
    const userPartial = { email: 'test@test.com', password: '123456' };
    const insertResult = {
      identifiers: [{ id: '1' }],
      generatedMaps: [],
      raw: [],
    };

    const insertSpy = jest
      .spyOn(typeormRepository, 'insert')
      .mockResolvedValue(insertResult);

    const result = await repository.insert(userPartial);

    expect(insertSpy).toHaveBeenCalledWith(userPartial);
    expect(result).toEqual(insertResult);
  });
});
