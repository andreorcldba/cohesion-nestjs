import { Test, TestingModule } from '@nestjs/testing';
import { ICreateUserController } from '../interfaces/create-user.controller.interface';
import { CreateUserController } from '../create-user.controller';
import { ICreateUserService } from '../interfaces/create-user.service.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../interfaces/create-user.repository.interface';
import { CREATE_USER_SERVICE } from '../constants/create-user.module.constant';

describe('CreateUserController', () => {
  let controller: ICreateUserController;
  let service: jest.Mocked<ICreateUserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CREATE_USER_SERVICE,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
    service = module.get(CREATE_USER_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should call createUserService.execute and return result', async () => {
    const dto = new CreateUserDto();

    dto.email = 'test@test.com';
    dto.password = '999999';

    const expectedResult: Partial<IUser> = {
      id: 'e906fce3-e805-44ac-857d-3ffba4cb8c21',
    };

    service.execute.mockResolvedValue(expectedResult);

    const result = await controller.execute(dto);

    expect(service.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});
