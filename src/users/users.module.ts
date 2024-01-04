import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { RolesModule } from '../roles/roles.module';
import { PositionsModule } from '../positions/positions.module';
import { SectionModule } from '../section/section.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    PositionsModule,
    SectionModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
