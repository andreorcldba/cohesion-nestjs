import {
  Controller,
  HttpStatus,
  HttpCode,
  Inject,
  Param,
  Delete,
} from '@nestjs/common';
import { IRemoveUserService } from './interfaces/remove-user.service.interface';
import { IRemoveUserController } from './interfaces/remove-user.controller.interface';
import { REMOVE_USER_SERVICE } from './constants/remove-user.module.constant';

@Controller('users')
export class RemoveUserController implements IRemoveUserController {
  constructor(
    @Inject(REMOVE_USER_SERVICE)
    private readonly removeUserService: IRemoveUserService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async execute(@Param('id') id: string): Promise<void> {
    await this.removeUserService.execute(id);
  }
}
