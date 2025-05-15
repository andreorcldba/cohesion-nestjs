import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @MaxLength(20)
  public password: string;
}
