import { PaginateResponse } from '#common';
import { CreateOptions, FilterQuery, PaginateOptions, QueryOptions } from 'mongoose';

export interface BaseRepositoryInterface<T> {
  create(data: Partial<T> | Partial<T>[], options?: CreateOptions): Promise<T>;
  update(filter: FilterQuery<T>, data: Partial<T>, options?: QueryOptions<T>): Promise<T>;
  delete(filter: FilterQuery<T>, options?: QueryOptions<T>): Promise<boolean>;
  softDelete(filter: FilterQuery<T>): Promise<boolean>;
  paginate(filter: FilterQuery<T>, options: PaginateOptions): Promise<PaginateResponse<T>>;
  find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
  findOne(filter: FilterQuery<T>, projection?: string[]): Promise<T>;
}
