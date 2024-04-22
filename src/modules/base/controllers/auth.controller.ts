import { Body, Controller, Post, Get, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Public, ReqUser } from '#common';
import { AuthService, JwtVerifyGuard, LocalAuthGuard, JwtSign, Payload } from '#auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(@ReqUser() user: Payload): Promise<JwtSign> {
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
  public jwtRefresh(
    @ReqUser() user: Payload,
    @Body('refreshToken') token?: string,
  ): Promise<JwtSign> {
    if (!token || !this.authService.validateRefreshToken(user, token)) {
      throw new UnauthorizedException('InvalidRefreshToken');
    }

    return this.authService.jwtSign(user);
  }
}
