import { UsersModule } from '#/users';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import * as controllers from './controllers';
import * as services from './services';

@Module({
  imports: [UsersModule, TerminusModule, HttpModule],
  providers: Object.values(services),
  exports: [],
  controllers: Object.values(controllers),
})
export class BaseModule {}
