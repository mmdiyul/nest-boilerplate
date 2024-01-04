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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { GeneratorResponse } from '../../core/generator.response';
import { Response } from 'express';
import { Role } from './entities/role.entity';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  logger = new Logger(RolesController.name);
  generatorResponse = new GeneratorResponse<Role>();
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @Res() res: Response) {
    try {
      return this.generatorResponse.successResponse(
        res,
        await this.rolesService.create(createRoleDto),
        'Success',
        'Role Created',
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
        await this.rolesService.findAll(page, limit, sortBy, sortDir),
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

  @Get('all')
  async getAll(@Res() res: Response) {
    try {
      return this.generatorResponse.successArrayResponse(
        res,
        await this.rolesService.getAll(),
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

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      return this.generatorResponse.successResponse(
        res,
        await this.rolesService.findOne(+id),
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
    @Body() updateRoleDto: UpdateRoleDto,
    @Res() res: Response,
  ) {
    try {
      return this.generatorResponse.successResponse(
        res,
        await this.rolesService.update(+id, updateRoleDto),
        'Success',
        'Role Updated',
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
        await this.rolesService.remove(+id),
        'Success',
        'Role Deleted',
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
