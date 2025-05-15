import { Controller, Inject, Get } from '@nestjs/common';
import { IFindAllUserController } from './interfaces/find-all-user.controller.interface';
import { FIND_ALL_USER_SERVICE } from './constants/find-all-user.module.constant';
import { IUser } from './interfaces/find-all-user.repository.interface';
import { IFindAllUserService } from './interfaces/find-all-user.service.interface';

@Controller('users')
export class FindAllUserController implements IFindAllUserController {
  constructor(
    @Inject(FIND_ALL_USER_SERVICE)
    private readonly findAllUserService: IFindAllUserService,
  ) {}

  @Get()
  public async execute(): Promise<IUser[]> {
    return await this.findAllUserService.execute();
  }
}
