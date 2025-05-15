import { Test, TestingModule } from '@nestjs/testing';
import { IRemoveUserController } from '../interfaces/remove-user.controller.interface';
import { RemoveUserController } from '../remove-user.controller';
import { IRemoveUserService } from '../interfaces/remove-user.service.interface';
import { REMOVE_USER_SERVICE } from '../constants/remove-user.module.constant';
import { NotFoundException } from '@nestjs/common';

describe('CreateUserController', () => {
  let controller: IRemoveUserController;
  let service: jest.Mocked<IRemoveUserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoveUserController],
      providers: [
        {
          provide: REMOVE_USER_SERVICE,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<IRemoveUserController>(RemoveUserController);
    service = module.get(REMOVE_USER_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should call removeUserService.execute with correct id', async () => {
    const id = '123';

    service.execute.mockResolvedValue(undefined);

    await controller.execute(id);

    expect(service.execute).toHaveBeenCalledWith(id);
  });

  it('should throw NotFoundException when service throws it', async () => {
    const id = '123';
    service.execute.mockRejectedValue(new NotFoundException());

    await expect(controller.execute(id)).rejects.toThrow(NotFoundException);
  });
});
