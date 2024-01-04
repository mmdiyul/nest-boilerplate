import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { GeneratorResponse } from '../../core/generator.response';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('user')
export class UsersController {
  logger = new Logger();
  generatorResponse = new GeneratorResponse<User>();
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      return this.generatorResponse.successResponse(
        res,
        await this.usersService.create(createUserDto),
        'Success',
        'User Created',
        HttpStatus.CREATED,
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

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('sortBy') sortBy: string,
    @Query('sortDir') sortDir: string,
  ) {
    try {
      return this.generatorResponse.successPageResponse(
        res,
        await this.usersService.findAll(page, limit, sortBy, sortDir),
        'OK',
        'Success',
        HttpStatus.OK,
        page,
        limit,
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

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      return this.generatorResponse.successResponse(
        res,
        await this.usersService.findOne(+id),
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      return this.generatorResponse.successResponse(
        res,
        await this.usersService.update(+id, updateUserDto),
        'Success',
        'User Updated',
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

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      return this.generatorResponse.successResponse(
        res,
        await this.usersService.remove(+id),
        'Success',
        'User Deleted',
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
