import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GeneratorResponse } from '../core/generator.response';
import { PublicApi } from './auth/jwt/public.api';

@Controller()
@ApiTags('root')
export class AppController {
  generatorResponse = new GeneratorResponse();
  constructor() {}

  @Get('check-health')
  @PublicApi()
  public checkHealth(@Res() res: Response) {
    return this.generatorResponse.successResponse(
      res,
      null,
      'API Works',
      'OK',
      200,
    );
  }
}
