import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'nest',
      entities: [__dirname + '/../**/*.entity.ts'],
      autoLoadEntities: true,
    }),
    RolesModule,
    UsersModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
