import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerOptions, configuration } from 'src/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigService } from '#common';

import { ExceptionsFilter } from '#common';
import { CommonModule } from '#common';
import RoutersModule from './app.router';
import { UsersModule } from '#modules/users';
import { BaseModule } from '#modules/base';
import { AuthModule, JwtAuthGuard } from '#auth';
import { AccountsModule } from '#modules/accounts';
import { CommandsModule } from '#commands';

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
          : `.env.${process.env.NODE_ENV || 'development'}`,
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
    /**
     * Cache redis
     * https://docs.nestjs.com/techniques/caching
     */
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisURL = configService.get('db.redis.cacheURL');
        const parsedURL = new URL(redisURL);
        return <RedisClientOptions>{
          store: redisStore,
          ttl: configService.get('cacheManager.ttl'),
          host: parsedURL.hostname,
          port: +parsedURL.port,
          username: parsedURL.username ? decodeURIComponent(parsedURL.username) : undefined,
          password: parsedURL.password ? decodeURIComponent(parsedURL.password) : undefined,
          db: parsedURL.pathname.substring(1),
          tls: parsedURL.protocol === 'rediss:',
        };
      },
    }),
    // Routers
    RoutersModule,
    /**
     * Commands
     * https://docs.nestjs.com/recipes/nest-commander
     */
    // CommandsModule,
    /**
     * Modules
     * https://docs.nestjs.com/modules
     */
    CommandsModule,
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
