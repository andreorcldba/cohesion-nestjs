import { Test, TestingModule } from '@nestjs/testing';
import { IFindOneUserController } from '../interfaces/find-one-user.controller.interface';
import { IFindOneUserService } from '../interfaces/find-one-user.service.interface';
import { FindOneUserController } from '../find-one-user.controller';
import { IUser } from '../interfaces/find-one-user.repository.interface';
import { FIND_ONE_USER_SERVICE } from '../constants/find-one-user.module.constant';

describe('FindAllUserController', () => {
  let controller: IFindOneUserController;
  let service: jest.Mocked<IFindOneUserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindOneUserController],
      providers: [
        {
          provide: FIND_ONE_USER_SERVICE,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<IFindOneUserController>(FindOneUserController);
    service = module.get(FIND_ONE_USER_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
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

    const spy = jest.spyOn(service, 'execute').mockResolvedValue(user);

    const result = await controller.execute(id);

    expect(spy).toHaveBeenCalledWith(id);
    expect(result).toEqual(user);
  });
});
