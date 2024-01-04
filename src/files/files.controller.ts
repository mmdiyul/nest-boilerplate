import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { GeneratorResponse } from '../../core/generator.response';
import { File } from './entities/file.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicApi } from '../auth/jwt/public.api';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as process from 'process';
import { ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('file')
export class FilesController {
  logger = new Logger(FilesController.name);
  generatorResponse = new GeneratorResponse<File>();
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/upload',
        filename: (req, file, callback) => {
          callback(
            null,
            [
              Math.floor(new Date().getTime() / 1000),
              file.originalname.split(' ').join('_'),
            ].join('_'),
          );
        },
      }),
    }),
  )
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      return this.generatorResponse.successResponse(
        res,
        await this.filesService.upload(file, 'upload', req.ip, req.user),
        'OK',
        'Success',
        HttpStatus.OK,
      );
    } catch (error) {
      this.logger.error(error.message);
      return this.generatorResponse.failedResponse(
        res,
        null,
        error.message,
        null,
        error.statusCode,
      );
    }
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    try {
      const file = createReadStream(
        join(process.cwd(), await this.filesService.getPath(+id)),
      );
      file.pipe(res);
    } catch (error) {
      this.logger.error(error.message);
      return this.generatorResponse.failedResponse(
        res,
        null,
        error.message,
        null,
        error.statusCode,
      );
    }
  }
}
