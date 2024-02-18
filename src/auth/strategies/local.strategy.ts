import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import type { Payload } from '../auth.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<Payload> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('UserOrPasswordNotMatch');
    }

    return { userId: user._id, username: user.username, roles: user.roles };
  }
}
