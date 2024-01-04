import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]), UsersModule],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository],
  exports: [FilesService, FilesRepository],
})
export class FilesModule {}
