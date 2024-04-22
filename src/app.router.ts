import { RouterModule } from '@nestjs/core';

import { UsersModule } from '#modules/users';
import { AccountsModule } from '#modules/accounts';
import { BaseModule } from '#modules/base';

/**
 * Routers
 * https://docs.nestjs.com/recipes/router-module
 */
export default RouterModule.register([
  {
    path: '/',
    module: BaseModule,
  },
  {
    path: '/accounts',
    module: AccountsModule,
  },
  {
    path: '/users',
    module: UsersModule,
  },
]);
