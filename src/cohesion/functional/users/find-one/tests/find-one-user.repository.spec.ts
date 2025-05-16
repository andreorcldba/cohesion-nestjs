import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOneUserRepository } from '../repositories/find-one-user.repository';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces/find-one-user.repository.interface';

describe('FindOneUserRepository', () => {
  let repository: FindOneUserRepository;
  let typeormRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneUserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<FindOneUserRepository>(FindOneUserRepository);
    typeormRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(typeormRepository).toBeDefined();
  });

  describe('findOneById', () => {
    it('should call repository.findOneBy with correct id and return user', async () => {
      const id = '123';
      const user: IUser = {
        id: '0075ced6-9855-459f-b8b9-e16d9f149acc',
        created_at: '2025-05-15T02:20:03.571Z',
        updated_at: '2025-05-15T02:20:03.571Z',
        email: 'test@test.com',
        password: '123',
        remember_token: null,
      };

      const findOneBySpy = jest
        .spyOn(typeormRepository, 'findOneBy')
        .mockResolvedValue(user);

      const result = await repository.findOneById(id);

      expect(findOneBySpy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      const id = '456';

      const findOneBySpy = jest
        .spyOn(typeormRepository, 'findOneBy')
        .mockResolvedValue(null);

      const result = await repository.findOneById(id);

      expect(findOneBySpy).toHaveBeenCalledWith({ id });
      expect(result).toBeNull();
    });
  });
});
