import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { CaptureExceptionsFilter } from '@shared/filters/exception';
import { BuildResponse } from '@shared/interceptors/BuildResponse';
import { DurationRequest } from '@shared/interceptors/DurationRequest';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cosmos API')
    .setDescription('The Cosmo ERP API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new CaptureExceptionsFilter());
  app.useGlobalInterceptors(new DurationRequest(), new BuildResponse());
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
