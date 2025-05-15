import { Test, TestingModule } from '@nestjs/testing';
import { IRemoveUserService } from '../interfaces/remove-user.service.interface';
import { IRemoveUserRepository } from '../interfaces/remove-user.repository.interface';
import { RemoveUserService } from '../remove-user.service';
import { REMOVE_USER_REPOSITORY } from '../constants/remove-user.module.constant';
import { NotFoundException } from '@nestjs/common';

describe('RemoveUserService', () => {
  let service: IRemoveUserService;
  let repository: jest.Mocked<IRemoveUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveUserService,
        {
          provide: REMOVE_USER_REPOSITORY,
          useValue: {
            removeById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IRemoveUserService>(RemoveUserService);
    repository = module.get(REMOVE_USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should complete successfully when a user is removed', async () => {
    repository.removeById.mockResolvedValue({ affected: 1, raw: [] });

    await expect(service.execute('some-id')).resolves.toBeUndefined();

    expect(repository.removeById).toHaveBeenCalledWith('some-id');
  });

  it('should throw NotFoundException when no user is removed', async () => {
    repository.removeById.mockResolvedValue({ affected: 0, raw: [] });

    await expect(service.execute('some-id')).rejects.toThrow(NotFoundException);

    expect(repository.removeById).toHaveBeenCalledWith('some-id');
  });
});
