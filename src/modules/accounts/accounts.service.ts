import { Injectable } from '@nestjs/common';

import { UsersService } from '#modules/users';
import { UserDocument } from '#entities/main';

@Injectable()
export class AccountsService {
  constructor(private readonly usersService: UsersService) {}

  async getDetails(userId: string): Promise<UserDocument> {
    return await this.usersService.findOne({ _id: userId });
  }
}
