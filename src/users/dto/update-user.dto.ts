import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  role_id: number;

  @IsString()
  username: string;

  @IsString()
  fullname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password: string;
}
