import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerOptions, configuration } from 'src/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CommonModule, ExceptionsFilter } from '#common';

import RoutersModule from './app.router';
import { UsersModule } from '#/users';
import { AuthModule } from '#/auth';
import { BaseModule } from '#/base';
import { JwtAuthGuard } from '#/auth/guards';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    /**
     * Logger
     * https://getpino.io
     * https://github.com/iamolegga/nestjs-pino
     */
    LoggerModule.forRoot(loggerOptions),
    /**
     * Configuration
     * https://docs.nestjs.com/techniques/configuration
     */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env'
          : `.${process.env.NODE_ENV || 'development'}.env`,
    }),
    /**
     * Database
     * https://docs.nestjs.com/techniques/mongodb
     */
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('db.mongo.mainURL'),
      }),
      connectionName: 'main',
    }),
    // Routers
    RoutersModule,
    /**
     * Modules
     * https://docs.nestjs.com/modules
     */
    CommonModule,
    AuthModule,
    BaseModule,
    UsersModule,
    AccountsModule,
  ],
  providers: [
    // Global Jwt Auth Guard, Authentication check on all routers except isPublic
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    // Global Filter, Exception check
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    // Global Pipe, Validation check
    // https://docs.nestjs.com/pipes#global-scoped-pipes
    // https://docs.nestjs.com/techniques/validation
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // disableErrorMessages: true,
        transform: true, // transform object to DTO class
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
