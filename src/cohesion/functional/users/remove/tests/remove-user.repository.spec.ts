import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemoveUserRepository } from '../repositories/remove-user.repository';
import { User } from '../entities/user.entity';

describe('RemoveUserRepository', () => {
  let repository: RemoveUserRepository;
  let typeormRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveUserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<RemoveUserRepository>(RemoveUserRepository);
    typeormRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(typeormRepository).toBeDefined();
  });

  describe('removeById', () => {
    it('should call repository.delete with correct id and return result', async () => {
      const id = '123';
      const deleteResult = { affected: 1, raw: [] };

      const deleteSpy = jest
        .spyOn(typeormRepository, 'delete')
        .mockResolvedValue(deleteResult);

      const result = await repository.removeById(id);

      expect(deleteSpy).toHaveBeenCalledWith(id);
      expect(result).toEqual(deleteResult);
    });
  });
});
