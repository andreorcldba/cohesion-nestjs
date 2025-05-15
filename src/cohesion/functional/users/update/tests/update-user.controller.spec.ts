import { Test, TestingModule } from '@nestjs/testing';
import { IUpdateUserController } from '../interfaces/update-user.controller.interface';
import { UpdateUserController } from '../update-user.controller';
import { IUpdateUserService } from '../interfaces/update-user.service.interface';
import { UPDATE_USER_SERVICE } from '../constants/update-user.module.constant';
import { UpdateUserDto } from '../dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('CreateUserController', () => {
  let controller: IUpdateUserController;
  let service: jest.Mocked<IUpdateUserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserController],
      providers: [
        {
          provide: UPDATE_USER_SERVICE,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<IUpdateUserController>(UpdateUserController);
    service = module.get(UPDATE_USER_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should call updateUserService.execute with correct parameters', async () => {
    const id = '123';
    const updateUserDto: UpdateUserDto = {
      email: 'test@test.com',
    };

    service.execute.mockResolvedValue(undefined);

    await controller.execute(id, updateUserDto);

    expect(service.execute).toHaveBeenCalledWith(id, updateUserDto);
  });

  it('should throw NotFoundException if updateUserService.execute throws it', async () => {
    const id = '123';
    const updateUserDto: UpdateUserDto = {
      email: 'test@test.com',
    };

    service.execute.mockRejectedValue(new NotFoundException());

    await expect(controller.execute(id, updateUserDto)).rejects.toThrow(
      NotFoundException,
    );
  });
});
