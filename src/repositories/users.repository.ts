import { User, UserDocument } from '#entities/main';
import { FilterQuery, PaginateModel, PaginateOptions } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryAbstract } from './base';
import { UsersRepositoryInterface } from '#/users/interfaces/users.interface';
import { PaginateResponse } from '#common';

export class UsersRepository
  extends BaseRepositoryAbstract<UserDocument>
  implements UsersRepositoryInterface
{
  constructor(
    @InjectModel(User.name, 'main')
    private readonly userModel: PaginateModel<UserDocument>,
  ) {
    super(userModel);
  }

  override async findAll(
    filter: FilterQuery<UserDocument>,
    options: PaginateOptions,
  ): Promise<PaginateResponse<UserDocument>> {
    options = { select: '-__v -password', ...options };
    return super.findAll(filter, options);
  }

  async findOneForAuth(filter: FilterQuery<UserDocument>): Promise<UserDocument> {
    return super.findOne(filter, ['username', 'roles', 'password']);
  }
}
