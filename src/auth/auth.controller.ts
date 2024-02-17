import { Body, Controller, Post, Get, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtVerifyGuard, LocalAuthGuard } from './guards';
import { Public, ReqUser } from '#common';
import { JwtSign, Payload } from './auth.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public login(@ReqUser() user: Payload): JwtSign {
    return this.authService.jwtSign(user);
  }

  // Check
  @Get('/check')
  public jwtCheck(@ReqUser() user: Payload): Payload {
    return user;
  }

  // Only verify is performed without checking the expiration of the accessToken.
  @Public()
  @UseGuards(JwtVerifyGuard)
  @Post('/refresh')
  public jwtRefresh(@ReqUser() user: Payload, @Body('refreshToken') token?: string): JwtSign {
    if (!token || !this.authService.validateRefreshToken(user, token)) {
      throw new UnauthorizedException('InvalidRefreshToken');
    }

    return this.authService.jwtSign(user);
  }
}
