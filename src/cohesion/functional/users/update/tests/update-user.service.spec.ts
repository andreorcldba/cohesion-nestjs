import { Test, TestingModule } from '@nestjs/testing';
import { IUpdateUserService } from '../interfaces/update-user.service.interface';
import { IUpdateUserRepository } from '../interfaces/update-user.repository.interface';
import { UpdateUserService } from '../update-user.service';
import { UPDATE_USER_REPOSITORY } from '../constants/update-user.module.constant';
import { UpdateUserDto } from '../dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UpdateUserService', () => {
  let service: IUpdateUserService;
  let repository: jest.Mocked<IUpdateUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: UPDATE_USER_REPOSITORY,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IUpdateUserService>(UpdateUserService);
    repository = module.get(UPDATE_USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should complete without errors when update affects rows', async () => {
    repository.update.mockResolvedValue({
      affected: 1,
      generatedMaps: [],
      raw: [],
    });

    const updateUserDto: UpdateUserDto = {
      email: 'test@test.com',
    };

    await expect(
      service.execute('some-id', updateUserDto),
    ).resolves.toBeUndefined();

    expect(repository.update).toHaveBeenCalledWith('some-id', updateUserDto);
  });

  it('should throw NotFoundException when no rows are affected', async () => {
    repository.update.mockResolvedValue({
      affected: 0,
      generatedMaps: [],
      raw: [],
    });

    await expect(
      service.execute('some-id', { name: 'New Name' } as UpdateUserDto),
    ).rejects.toThrow(NotFoundException);

    expect(repository.update).toHaveBeenCalledWith('some-id', {
      name: 'New Name',
    });
  });
});
