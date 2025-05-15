import { Controller, Inject, Get, Param } from '@nestjs/common';
import { IFindOneUserController } from './interfaces/find-one-user.controller.interface';
import { FIND_ONE_USER_SERVICE } from './constants/find-one-user.module.constant';
import { IFindOneUserService } from './interfaces/find-one-user.service.interface';
import { IUser } from './interfaces/find-one-user.repository.interface';

@Controller('users')
export class FindOneUserController implements IFindOneUserController {
  constructor(
    @Inject(FIND_ONE_USER_SERVICE)
    private readonly findAllUserService: IFindOneUserService,
  ) {}

  @Get(':id')
  public async execute(@Param('id') id: string): Promise<IUser | null> {
    return await this.findAllUserService.execute(id);
  }
}
