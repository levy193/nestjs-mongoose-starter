import { BaseRepositoryInterface } from '#repositories';
import { PaginateResponse } from '#common';
import { BaseServiceInterface } from './base.interface.service';

export abstract class BaseServiceAbstract<T> implements BaseServiceInterface<T> {
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  async create(createDto: Partial<T>, options?: object): Promise<T> {
    return await this.repository.create(createDto, options);
  }

  async update(filter: object, updateDto: Partial<T>, options?: object) {
    return await this.repository.update(filter, updateDto, options);
  }

  async remove(filter: object): Promise<boolean> {
    return await this.repository.softDelete(filter);
  }

  async findAll(filter?: object, options?: object): Promise<PaginateResponse<T>> {
    return await this.repository.findAll(filter, options);
  }

  async findOne(filter: object, projection?: string[]): Promise<T> {
    return await this.repository.findOne(filter, projection);
  }
}
