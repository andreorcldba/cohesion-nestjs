import { Test, TestingModule } from '@nestjs/testing';
import { ICreateUserService } from '../interfaces/create-user.service.interface';
import {
  ICreateUserRepository,
  IUser,
} from '../interfaces/create-user.repository.interface';
import { CreateUserService } from '../create-user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { CREATE_USER_REPOSITORY } from '../constants/create-user.module.constant';

describe('CreateUserService', () => {
  let service: ICreateUserService;
  let repository: jest.Mocked<ICreateUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: CREATE_USER_REPOSITORY,
          useValue: {
            insert: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ICreateUserService>(CreateUserService);
    repository = module.get(CREATE_USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a user and return the first identifier', async () => {
    const dto = new CreateUserDto();

    dto.email = 'test@test.com';
    dto.password = '999999';

    const expectedResult: Partial<IUser> = {
      id: 'e906fce3-e805-44ac-857d-3ffba4cb8c21',
    };

    repository.insert.mockResolvedValue({
      identifiers: [expectedResult],
      generatedMaps: [],
      raw: [],
    });

    const result = await service.execute(dto);

    expect(repository.insert).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });

  it('should throw InternalServerErrorException when no identifiers are returned', async () => {
    const dto = new CreateUserDto();

    dto.email = 'test@test.com';
    dto.password = '999999';

    repository.insert.mockResolvedValue({
      identifiers: [],
      generatedMaps: [],
      raw: [],
    });

    await expect(service.execute(dto)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });
});
