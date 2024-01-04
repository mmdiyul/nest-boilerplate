import { Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepository } from './roles.repository';
import { Role } from './entities/role.entity';
import { ExistsException } from '../../core/exception/exists.exception';
import { NotFoundException } from '../../core/exception/not-found.exception';

@Injectable()
export class RolesService {
  logger = new Logger(RolesService.name);
  constructor(private readonly rolesRepository: RolesRepository) {}
  async create(createRoleDto: CreateRoleDto) {
    const currentRole = await this.rolesRepository.findBy({
      code: createRoleDto.code,
    });
    if (currentRole.length) {
      throw new ExistsException('Role Code');
    }
    const role = new Role();
    role.code = createRoleDto.code;
    role.name = createRoleDto.name;
    return await this.rolesRepository.save(role);
  }

  async findAll(page: string, limit: string, sortBy: string, sortDir: string) {
    return await this.rolesRepository.findAndCount({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      order: {
        [sortBy]: sortDir,
      },
    });
  }

  async getAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: number) {
    const role = await this.rolesRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role id ${id} not found`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role id ${id} not found`);
    }
    const roleCodeData = await this.rolesRepository.findOneBy({
      code: updateRoleDto.code,
    });
    if (roleCodeData && roleCodeData.id !== role.id) {
      throw new ExistsException('Role Code');
    }
    role.code = updateRoleDto.code;
    role.name = updateRoleDto.name;
    return await this.rolesRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.rolesRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role id ${id} not found`);
    }
    await this.rolesRepository.softRemove(role);
    return null;
  }
}
