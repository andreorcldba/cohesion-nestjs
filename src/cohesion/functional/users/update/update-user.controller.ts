import {
  Controller,
  Body,
  HttpStatus,
  HttpCode,
  Inject,
  Patch,
  Param,
} from '@nestjs/common';
import { IUpdateUserService } from './interfaces/update-user.service.interface';
import { IUpdateUserController } from './interfaces/update-user.controller.interface';
import { UPDATE_USER_SERVICE } from './constants/update-user.module.constant';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UpdateUserController implements IUpdateUserController {
  constructor(
    @Inject(UPDATE_USER_SERVICE)
    private readonly updateUserService: IUpdateUserService,
  ) {}

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async execute(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.updateUserService.execute(id, updateUserDto);
  }
}
