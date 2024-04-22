import { CreateOptions, FilterQuery, PaginateOptions, QueryOptions } from 'mongoose';

import { BaseRepositoryInterface } from './base.repository.interface';
import { PaginateResponse } from '#common';
import { BaseServiceInterface } from './base.service.interface';

export abstract class BaseServiceAbstract<T> implements BaseServiceInterface<T> {
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  async create(createDto: Partial<T> | Partial<T>[], options?: CreateOptions): Promise<T> {
    return await this.repository.create(createDto, options);
  }

  async update(filter: FilterQuery<T>, updateDto: Partial<T>, options?: QueryOptions<T>) {
    return await this.repository.update(filter, updateDto, options);
  }

  async remove(filter: FilterQuery<T>): Promise<boolean> {
    return await this.repository.softDelete(filter);
  }

  async findOne(filter: FilterQuery<T>, projection?: string[]): Promise<T> {
    return await this.repository.findOne(filter, projection);
  }

  async find(filter?: FilterQuery<T>, options?: PaginateOptions): Promise<T[]> {
    return await this.repository.find(filter, options);
  }

  async paginate(filter?: FilterQuery<T>, options?: PaginateOptions): Promise<PaginateResponse<T>> {
    return await this.repository.paginate(filter, options);
  }
}
