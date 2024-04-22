import { FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from '#entities/main';
import { BaseRepositoryAbstract, BaseRepositoryInterface, PaginateResponse } from '#common';

export interface UsersRepositoryInterface extends BaseRepositoryInterface<UserDocument> {
  findOneForAuth(filter: object): Promise<UserDocument>;
}

export class UsersRepository
  extends BaseRepositoryAbstract<UserDocument>
  implements UsersRepositoryInterface
{
  constructor(
    @InjectModel(User.name, 'main')
    private readonly userModel: Model<UserDocument>,
    @InjectModel(User.name, 'main')
    private readonly userPaginateModel: PaginateModel<UserDocument>,
  ) {
    super(userModel, userPaginateModel);
  }

  override async paginate(
    filter: FilterQuery<UserDocument>,
    options: PaginateOptions,
  ): Promise<PaginateResponse<UserDocument>> {
    options = { select: '-__v -password', ...options };
    return super.paginate(filter, options);
  }

  async findOneForAuth(filter: FilterQuery<UserDocument>): Promise<UserDocument> {
    return super.findOne(filter, ['username', 'roles', 'password']);
  }
}
