import { RouterModule } from '@nestjs/core';
import { AuthModule } from '#/auth';
import { UsersModule } from '#/users';
import { AccountsModule } from '#/accounts/accounts.module';

/**
 * Routers
 * https://docs.nestjs.com/recipes/router-module
 */
export default RouterModule.register([
  {
    path: '/auth',
    module: AuthModule,
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
