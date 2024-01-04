import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsString, IsUppercase } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsString()
  @IsUppercase()
  code: string;

  @IsString()
  name: string;
}
