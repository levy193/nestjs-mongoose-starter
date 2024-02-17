import { UsersService } from '#/users';
import { UserDocument } from '#entities/vstore';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  constructor(private readonly usersService: UsersService) {}

  async getDetails(userId: string): Promise<UserDocument> {
    return await this.usersService.findOne({ _id: userId });
  }
}
