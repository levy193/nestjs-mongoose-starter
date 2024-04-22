import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { UsersModule } from '#modules/users';

@Module({
  imports: [UsersModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
