import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { Payload } from '#auth';
import { MongooseClassSerializerInterceptor, ReqUser } from '#common';
import { User, UserDocument } from '#entities/main';

@Controller()
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @Get('details')
  async details(@ReqUser() user: Payload): Promise<UserDocument> {
    return this.accountService.getDetails(user.userId);
  }
}
