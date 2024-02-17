import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  if (isProduction) {
    app.enable('trust proxy');
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Express middleware
  middleware(app);

  app.enableShutdownHooks();
  await app.listen(configService.get('server.port'));
}

// start the app
bootstrap();
