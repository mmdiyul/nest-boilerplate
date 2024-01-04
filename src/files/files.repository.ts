import { BaseRepository } from '../../core/base.repository';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class FilesRepository extends BaseRepository<File> {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {
    super(fileRepository);
  }
}
