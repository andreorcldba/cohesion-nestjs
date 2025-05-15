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
import { CREATE_USER_SERVICE } from './constants/create-user-repository.token';

@Controller('users')
export class CreateUsersController {
  constructor(
    @Inject(CREATE_USER_SERVICE)
    private readonly createUserService: ICreateUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async execute(@Body() createUserDto: CreateUserDto) {
    return await this.createUserService.execute(createUserDto);
  }
}
