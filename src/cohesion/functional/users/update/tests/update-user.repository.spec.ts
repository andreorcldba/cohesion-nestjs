import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserRepository } from '../repositories/update-user.repository';
import { User } from '../entities/user.entity';

describe('UpdateUserRepository', () => {
  let repository: UpdateUserRepository;
  let typeormRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<UpdateUserRepository>(UpdateUserRepository);
    typeormRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(typeormRepository).toBeDefined();
  });

  it('should call repository.update with correct id and user data and return result', async () => {
    const id = '123';
    const userData = { email: 'test@test.com' };
    const updateResult = { affected: 1, generatedMaps: [], raw: [] };

    const updateSpy = jest
      .spyOn(typeormRepository, 'update')
      .mockResolvedValue(updateResult);

    const result = await repository.update(id, userData);

    expect(updateSpy).toHaveBeenCalledWith(id, userData);
    expect(result).toEqual(updateResult);
  });
});
