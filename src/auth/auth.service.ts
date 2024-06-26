import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

import type { JwtPayload, JwtSign, Payload } from './auth.interface';
import { UsersService } from '#modules/users';
import { User } from '#entities/main';
import { AuthConfig } from './auth.config';
import { AuthUtilService } from './utils';
import { ConfigService } from '#common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly authUtilService: AuthUtilService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}

  public async validateUser(username: string, password: string): Promise<Partial<User> | null> {
    const user = await this.usersService.findOneForAuth({ username });

    const isMatch = await bcrypt.compare(password, user?.password);
    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject();
      return result;
    }

    return null;
  }

  public async setUserPassword(username: string, password: string): Promise<boolean> {
    const salt = await this.generatePasswordSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = await this.usersService.update(
      { username },
      {
        password: hash,
      },
      {
        upsert: false,
      },
    );
    if (!user) {
      throw new InternalServerErrorException('NotFoundUser');
    }

    return true;
  }

  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    if (!this.jwtService.verify(refreshToken)) {
      return false;
    }

    const payload = this.jwtService.decode<{ sub: string }>(refreshToken);
    return data.userId && payload.sub === data.userId;
  }

  public async jwtSign(data: Payload): Promise<JwtSign> {
    // Generate a random sessionId
    const sessionId = nanoid(6);

    // Create jwt payload
    const payload: JwtPayload = {
      sub: data.userId,
      username: data.username,
      roles: data.roles,
      sessionId,
    };

    // Save sessionId to the cache manager
    await this.cacheManager.set(this.authUtilService.getCacheSessionKey(data.userId), sessionId, 0);

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.getRefreshToken(payload.sub),
    };
  }

  public getPayload(token: string): Payload | null {
    try {
      const payload = this.jwtService.decode<JwtPayload | null>(token);
      if (!payload) {
        return null;
      }

      return { userId: payload.sub, username: payload.username, roles: payload.roles };
    } catch {
      // Unexpected token i in JSON at position XX
      return null;
    }
  }

  private getRefreshToken(sub: string): string {
    return this.jwtService.sign(
      { sub },
      {
        expiresIn: this.config.get('auth.jwt.refreshExpiresIn'), // Set greater than the expiresIn of the accessToken
      },
    );
  }

  async generatePasswordSalt(): Promise<string> {
    return await bcrypt.genSalt(AuthConfig.saltRounds || 10);
  }
}
