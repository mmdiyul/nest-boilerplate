import { BaseRepository } from '../../core/base.repository';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UsersRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }
}
