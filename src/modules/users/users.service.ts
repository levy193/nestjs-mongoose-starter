import { Inject, Injectable } from '@nestjs/common';

import { BaseServiceAbstract } from '#common';
import { UserDocument } from '#entities/main';
import { UsersRepositoryInterface } from './repositories';

@Injectable()
export class UsersService extends BaseServiceAbstract<UserDocument> {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UsersRepositoryInterface,
  ) {
    super(usersRepository);
  }

  async findOneForAuth(filter: object): Promise<UserDocument> {
    return await this.usersRepository.findOneForAuth(filter);
  }
}
