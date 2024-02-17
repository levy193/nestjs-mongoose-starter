import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy, JwtVerifyStrategy } from './strategies';
import { UsersModule } from '../users';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('auth.jwt.secret'),
        signOptions: { expiresIn: config.get('auth.jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthSerializer, LocalStrategy, JwtStrategy, JwtVerifyStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
