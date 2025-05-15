import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ICreateUserService } from './interfaces/create-user.service.interface';
import { ICreateUserController } from './interfaces/create-user.controller.interface';
import { IUser } from './interfaces/create-user.repository.interface';
import { CREATE_USER_SERVICE } from './constants/create-user.module.constant';

@Controller('users')
export class CreateUserController implements ICreateUserController {
  constructor(
    @Inject(CREATE_USER_SERVICE)
    private readonly createUserService: ICreateUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async execute(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Partial<IUser>> {
    return await this.createUserService.execute(createUserDto);
  }
}
