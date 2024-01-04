import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
  password: string;
}
