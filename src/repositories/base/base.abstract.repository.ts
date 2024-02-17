import { PaginateResponse } from '#common';
import { BaseRepositoryInterface } from './base.interface.repository';
import { CreateOptions, FilterQuery, QueryOptions, PaginateModel, PaginateOptions } from 'mongoose';

export abstract class BaseRepositoryAbstract<T> implements BaseRepositoryInterface<T> {
  protected constructor(protected readonly model: PaginateModel<T>) {}

  async create(data: Partial<T>, options: CreateOptions): Promise<T> {
    const raw = await this.model.create([data], options);
    return raw[0];
  }

  async update(filter: FilterQuery<T>, data: Partial<T>, options: QueryOptions<T>): Promise<T> {
    filter = { ...filter, isDeleted: false };
    return this.model.findOneAndUpdate<T>(filter, data, options);
  }

  async delete(filter: FilterQuery<T>, options?: QueryOptions<T>): Promise<boolean> {
    return !!(await this.model.findOneAndDelete<T>(filter, options));
  }

  async softDelete(filter: FilterQuery<T>): Promise<boolean> {
    return !!(await this.model.findOneAndUpdate<T>(
      { ...filter, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
    ));
  }

  async findAll(filter: FilterQuery<T>, options: PaginateOptions): Promise<PaginateResponse<T>> {
    const result = await this.model.paginate<T>({ ...filter, isDeleted: false }, options);
    return <PaginateResponse<T>>{
      items: result.docs,
      totalItems: result.totalDocs,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async findById(id: string, projection?: string): Promise<T> {
    return this.model.findOne<T>({ _id: id, isDeleted: false }, projection);
  }

  async findOne(filter: FilterQuery<T>, projection?: string[]): Promise<T> {
    return this.model.findOne<T>({ ...filter, isDeleted: false }, projection?.join(' '));
  }
}
