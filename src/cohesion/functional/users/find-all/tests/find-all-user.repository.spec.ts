import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllUserRepository } from '../repositories/find-all-user.repository';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces/find-all-user.repository.interface';

describe('FindAllUserRepository', () => {
  let repository: FindAllUserRepository;
  let typeormRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllUserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<FindAllUserRepository>(FindAllUserRepository);
    typeormRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(typeormRepository).toBeDefined();
  });

  it('should call repository.find and return result', async () => {
    const users: IUser[] = [
      {
        id: '0075ced6-9855-459f-b8b9-e16d9f149acc',
        created_at: '2025-05-15T02:20:03.571Z',
        updated_at: '2025-05-15T02:20:03.571Z',
        email: 'test@test.com',
        password: '123',
        remember_token: null,
      },
      {
        id: '9e83991f-a493-4452-9c9d-cfe635e07818',
        created_at: '2025-05-15T02:38:35.193Z',
        updated_at: '2025-05-15T02:38:35.193Z',
        email: 'test2@test.com',
        password: '123',
        remember_token: null,
      },
    ];

    const findSpy = jest
      .spyOn(typeormRepository, 'find')
      .mockResolvedValue(users);

    const result = await repository.find();

    expect(findSpy).toHaveBeenCalled();
    expect(result).toEqual(users);
  });
});
