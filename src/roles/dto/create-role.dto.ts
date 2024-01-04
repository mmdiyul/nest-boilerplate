import { IsString, IsUppercase } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsUppercase()
  code: string;

  @IsString()
  name: string;
}
