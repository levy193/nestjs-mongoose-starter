import type { INestApplication } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';

export function middleware(app: INestApplication): INestApplication {
  app.use(compression());
  app.use(passport.initialize());
  app.use(helmet());
  // app.enableCors();

  return app;
}
