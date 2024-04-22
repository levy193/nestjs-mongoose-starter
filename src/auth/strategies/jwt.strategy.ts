import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

import type { JwtPayload, Payload } from '../auth.interface';
import { AuthUtilService } from '../utils';
import { ConfigService } from '#common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly config: ConfigService,
    private readonly authUtilService: AuthUtilService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('auth.jwt.secret'),
    });
  }

  public async validate(payload: JwtPayload): Promise<Payload> {
    // Validate sessionId
    const sessionId = payload.sessionId;
    const userSessionId = await this.cacheManager.get<string>(
      this.authUtilService.getCacheSessionKey(payload.sub),
    );
    if (sessionId !== userSessionId) {
      throw new UnauthorizedException('InvalidSession');
    }

    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
