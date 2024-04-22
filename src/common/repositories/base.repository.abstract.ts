import { PaginateResponse } from '#common';
import { BaseRepositoryInterface } from './base.repository.interface';
import {
  CreateOptions,
  FilterQuery,
  QueryOptions,
  PaginateModel,
  PaginateOptions,
  Model,
} from 'mongoose';

export abstract class BaseRepositoryAbstract<T> implements BaseRepositoryInterface<T> {
  protected constructor(
    protected readonly model: Model<T>,
    protected readonly paginateModel: PaginateModel<T>,
  ) {}

  async create(data: Partial<T> | Partial<T>[], options: CreateOptions): Promise<T> {
    const raw = await this.model.create(Array.isArray(data) ? data : [data], options);
    return raw[0];
  }

  async update(filter: FilterQuery<T>, data: Partial<T>, options: QueryOptions<T>): Promise<T> {
    filter = { ...filter, isDeleted: { $ne: true } };
    return this.model.findOneAndUpdate<T>(filter, data, options);
  }

  async delete(filter: FilterQuery<T>, options?: QueryOptions<T>): Promise<boolean> {
    return !!(await this.model.findOneAndDelete<T>(filter, options));
  }

  async softDelete(filter: FilterQuery<T>): Promise<boolean> {
    return !!(await this.model.findOneAndUpdate<T>(
      { ...filter, isDeleted: { $ne: true } },
      { isDeleted: true, deletedAt: new Date() },
    ));
  }

  async find(filter: FilterQuery<T>, options: QueryOptions<T>): Promise<T[]> {
    return this.model.find<T>({ ...filter, isDeleted: { $ne: true } }, null, options);
  }

  async paginate(filter: FilterQuery<T>, options: PaginateOptions): Promise<PaginateResponse<T>> {
    const result = await this.paginateModel.paginate<T>(
      { ...filter, isDeleted: { $ne: true } },
      options,
    );
    return <PaginateResponse<T>>{
      items: result.docs,
      totalItems: result.totalDocs,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async findById(id: string, projection?: string): Promise<T> {
    return this.model.findOne<T>(<FilterQuery<T>>{ _id: id, isDeleted: { $ne: true } }, projection);
  }

  async findOne(filter: FilterQuery<T>, projection?: string[]): Promise<T> {
    return this.model.findOne<T>({ ...filter, isDeleted: { $ne: true } }, projection?.join(' '));
  }
}
