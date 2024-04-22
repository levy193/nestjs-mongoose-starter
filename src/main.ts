import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create the app
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  // Get the config service
  const configService = app.get(ConfigService);

  // Use the logger
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  if (process.env.NODE_ENV === 'production') {
    // Enable trust proxy in production mode
    app.enable('trust proxy');
  }

  // Use the validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Use the middleware
  middleware(app);

  app.enableShutdownHooks();
  await app.listen(configService.get('server.port'));
}

// Start the app
bootstrap();
