import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import * as controllers from './controllers';
import { UsersModule } from '#modules/users';

@Module({
  imports: [UsersModule, TerminusModule, HttpModule],
  exports: [],
  controllers: Object.values(controllers),
})
export class BaseModule {}
