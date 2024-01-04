import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  const port = process.env.PORT ?? 3000;

  logger.log(`Running at port ${port}`);

  // swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('nestjs-boilerplate')
    .setDescription(
      'API Documentation for NestJS Boilerplate',
    )
    .setVersion('0.0.1')
    .addServer('http://localhost:3000/api', 'Local Environment')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  // validator
  app.useGlobalPipes(new ValidationPipe());

  // enable cors
  app.enableCors();

  // set prefix
  app.setGlobalPrefix('/api');

  await app.listen(port);
}
bootstrap();
