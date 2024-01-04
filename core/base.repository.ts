import { Entity, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export class BaseRepository<T> extends Repository<T> {
  constructor(
    @InjectRepository(<EntityClassOrSchema>Entity)
    private repository: Repository<T>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
