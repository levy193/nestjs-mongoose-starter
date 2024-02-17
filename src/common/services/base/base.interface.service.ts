import { PaginateResponse } from '#common';

export interface Write<T> {
  create(data: Partial<T>, options?: object): Promise<T>;
  update(filter: object, data: Partial<T>, options?: object): Promise<T>;
  remove(filter: object): Promise<boolean>;
}

export interface Read<T> {
  findAll(filter: object, options?: object): Promise<PaginateResponse<T>>;
  findOne(filter: object, options?: object): Promise<T>;
}

export interface BaseServiceInterface<T> extends Write<T>, Read<T> {}
