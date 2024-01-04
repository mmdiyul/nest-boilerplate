import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { ExistsException } from '../../core/exception/exists.exception';
import { User } from './entities/user.entity';
import { hash } from 'argon2';
import { RolesRepository } from '../roles/roles.repository';
import { NotFoundException } from '../../core/exception/not-found.exception';

@Injectable()
export class UsersService {
  logger = new Logger(UsersService.name);
  constructor(
    private userRepository: UsersRepository,
    private roleRepository: RolesRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const currentUsername = await this.userRepository.findBy({
      username: createUserDto.username,
    });
    if (currentUsername.length) {
      throw new ExistsException('User with this Username');
    }
    const currentEmail = await this.userRepository.findBy({
      email: createUserDto.email,
    });
    if (currentEmail.length) {
      throw new ExistsException('User with this Email');
    }
    const role = await this.roleRepository.findOneBy({
      id: createUserDto.role_id,
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const user = new User();
    user.role = role;
    user.username = createUserDto.username;
    user.fullname = createUserDto.fullname;
    user.email = createUserDto.email;
    user.password = await hash(createUserDto.password);
    return await this.userRepository.save(user);
  }

  async findAll(page: string, limit: string, sortBy: string, sortDir: string) {
    return await this.userRepository.findAndCount({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      order: {
        [sortBy]: sortDir,
      },
      relations: ['role'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const currentUsername = await this.userRepository.findOneBy({
      username: updateUserDto.username,
    });
    if (currentUsername && currentUsername.id !== user.id) {
      throw new ExistsException('User with this Username');
    }
    const currentEmail = await this.userRepository.findOneBy({
      email: updateUserDto.email,
    });
    if (currentEmail && currentEmail.id !== user.id) {
      throw new ExistsException('User with this Email');
    }
    const role = await this.roleRepository.findOneBy({
      id: updateUserDto.role_id,
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    user.role = role;
    user.username = updateUserDto.username;
    user.fullname = updateUserDto.fullname;
    user.email = updateUserDto.email;
    if (updateUserDto.password) {
      user.password = await hash(updateUserDto.password);
    }
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.softRemove(user);
    return null;
  }
}
