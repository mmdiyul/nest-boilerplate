import { Injectable, Logger } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { File } from './entities/file.entity';
import { NotFoundException } from '../../core/exception/not-found.exception';
import { UsersRepository } from '../users/users.repository';
import { use } from 'passport';

@Injectable()
export class FilesService {
  logger = new Logger(FilesService.name);
  constructor(
    private fileRepository: FilesRepository,
    private userRepository: UsersRepository,
  ) {}

  async upload(
    file: Express.Multer.File,
    category: string,
    ip: string,
    reqUser: any,
  ) {
    const user = await this.userRepository.findUserById(reqUser['id']);
    if (!user) throw new NotFoundException('User not found');
    const payload = new File();
    payload.filename = file.filename;
    payload.filesize = file.size;
    payload.filetype = file.mimetype;
    payload.path = file.path;
    payload.status = false;
    payload.category = category;
    payload.uploader_ip = ip;
    payload.creator = user;
    const fileRes = await this.fileRepository.save(payload);
    return await this.fileRepository.findOneBy({ path: fileRes.path });
  }

  async getPath(id: number) {
    const file = await this.fileRepository.findOneBy({ id });
    if (!file) throw new NotFoundException('File not found');
    return file.path;
  }
}
