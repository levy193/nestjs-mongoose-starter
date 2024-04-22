import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy, JwtVerifyStrategy } from './strategies';
import { UsersModule } from '#modules/users';
import { AuthUtilService } from './utils';
import { ConfigService } from '#common';

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
  providers: [
    AuthUtilService,
    AuthService,
    AuthSerializer,
    LocalStrategy,
    JwtStrategy,
    JwtVerifyStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
