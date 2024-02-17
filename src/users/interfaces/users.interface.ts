import { UserDocument } from '#entities/vstore';
import { BaseRepositoryInterface } from '#repositories';

export interface UsersRepositoryInterface extends BaseRepositoryInterface<UserDocument> {
  findOneForAuth(filter: object): Promise<UserDocument>;
}
