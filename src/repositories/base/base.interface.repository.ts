import { PaginateResponse } from '#common';
import { CreateOptions, FilterQuery, PaginateOptions, QueryOptions } from 'mongoose';

export interface BaseRepositoryInterface<T> {
  create(data: Partial<T>, options?: CreateOptions): Promise<T>;
  update(filter: FilterQuery<T>, data: Partial<T>, options?: QueryOptions<T>): Promise<T>;
  delete(filter: FilterQuery<T>, options?: QueryOptions<T>): Promise<boolean>;
  softDelete(filter: FilterQuery<T>): Promise<boolean>;
  findAll(filter: FilterQuery<T>, options?: PaginateOptions): Promise<PaginateResponse<T>>;
  findById(id: string, projection?: string): Promise<T>;
  findOne(filter: FilterQuery<T>, projection?: string[]): Promise<T>;
}
