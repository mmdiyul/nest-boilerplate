import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../core/base.repository';

export class RolesRepository extends BaseRepository<Role> {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }
}
