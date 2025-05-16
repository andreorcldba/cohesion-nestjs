import { Test, TestingModule } from '@nestjs/testing';
import { FIND_ALL_USER_REPOSITORY } from '../constants/find-all-user.module.constant';
import { FindAllUserService } from '../find-all-user.service';
import {
  IFindAllUserRepository,
  IUser,
} from '../interfaces/find-all-user.repository.interface';
import { IFindAllUserService } from '../interfaces/find-all-user.service.interface';

describe('FindAllUserService', () => {
  let service: IFindAllUserService;
  let repository: jest.Mocked<IFindAllUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllUserService,
        {
          provide: FIND_ALL_USER_REPOSITORY,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IFindAllUserService>(FindAllUserService);
    repository = module.get(FIND_ALL_USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return all users from the repository', async () => {
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

    const spy = jest.spyOn(repository, 'find').mockResolvedValue(users);

    const result = await service.execute();

    expect(spy).toHaveBeenCalled();
    expect(result).toEqual(users);
  });
});
