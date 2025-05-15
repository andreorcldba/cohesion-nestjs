import { Test, TestingModule } from '@nestjs/testing';
import { IFindAllUserController } from '../interfaces/find-all-user.controller.interface';
import { IFindAllUserService } from '../interfaces/find-all-user.service.interface';
import { FindAllUserController } from '../find-all-user.controller';
import { IUser } from '../interfaces/find-all-user.repository.interface';
import { FIND_ALL_USER_SERVICE } from '../constants/find-all-user.module.constant';

describe('FindAllUserController', () => {
  let controller: IFindAllUserController;
  let service: jest.Mocked<IFindAllUserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindAllUserController],
      providers: [
        {
          provide: FIND_ALL_USER_SERVICE,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<IFindAllUserController>(FindAllUserController);
    service = module.get(FIND_ALL_USER_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return all users from the service', async () => {
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

    service.execute.mockResolvedValue(users);

    const result = await controller.execute();

    expect(service.execute).toHaveBeenCalled();
    expect(result).toEqual(users);
  });
});
