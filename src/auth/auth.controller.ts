import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneratorResponse } from '../../core/generator.response';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { PublicApi } from './jwt/public.api';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  logger = new Logger(AuthController.name);
  generatorResponse = new GeneratorResponse();

  constructor(private authService: AuthService) {}

  @Post('login')
  @PublicApi()
  async login(@Body() body: LoginDto, @Res() res: Response) {
    try {
      return this.generatorResponse.successResponse(
        res,
        await this.authService.login(body.username, body.password),
        'Success',
        'User Logged In',
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
}
