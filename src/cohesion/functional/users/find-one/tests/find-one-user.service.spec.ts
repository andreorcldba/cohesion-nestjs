import { Test, TestingModule } from '@nestjs/testing';
import { FIND_ONE_USER_REPOSITORY } from '../constants/find-one-user.module.constant';
import { FindOneUserService } from '../find-one-user.service';
import {
  IFindOneUserRepository,
  IUser,
} from '../interfaces/find-one-user.repository.interface';
import { IFindOneUserService } from '../interfaces/find-one-user.service.interface';
import { NotFoundException } from '@nestjs/common';

describe('FindOneUserService', () => {
  let service: IFindOneUserService;
  let repository: jest.Mocked<IFindOneUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneUserService,
        {
          provide: FIND_ONE_USER_REPOSITORY,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IFindOneUserService>(FindOneUserService);
    repository = module.get(FIND_ONE_USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return a user when found by ID', async () => {
    const id = '0b5bc66c-47bf-4d05-aeee-ed34ed3eef67';
    const user: IUser = {
      id: '0075ced6-9855-459f-b8b9-e16d9f149acc',
      created_at: '2025-05-15T02:20:03.571Z',
      updated_at: '2025-05-15T02:20:03.571Z',
      email: 'test@test.com',
      password: '123',
      remember_token: null,
    };

    repository.findOneById.mockResolvedValue(user);

    const result = await service.execute(id);

    expect(repository.findOneById).toHaveBeenCalledWith(id);
    expect(result).toEqual(user);
  });

  it('should throw NotFoundException when user is not found', async () => {
    repository.findOneById.mockResolvedValue(null);

    await expect(service.execute('999')).rejects.toThrow(NotFoundException);
    expect(repository.findOneById).toHaveBeenCalledWith('999');
  });
});
