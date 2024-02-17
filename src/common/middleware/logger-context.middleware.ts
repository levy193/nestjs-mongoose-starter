// import { AuthService } from '#/auth';
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: PinoLogger,
    // private authService: AuthService,
  ) {}

  public use(req: Request, _res: Response, next: () => void): void {
    // const authorization = req.header('authorization');
    const user = req.user;
    // const user = authorization?.startsWith('Bearer')
    //   ? this.authService.getPayload(authorization.split(' ')[1])
    //   : req.user;
    const userId = user?.userId || null;
    // for https://github.com/iamolegga/nestjs-pino/issues/608
    req.customProps = { userId };
    // Add extra fields to share in logger context
    this.logger.assign(req.customProps);

    next();
  }
}
