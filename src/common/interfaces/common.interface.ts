export interface PaginateResponse<T> {
  items: T[];
  page?: number | undefined;
  limit?: number | undefined;
  totalItems: number;
  totalPages?: number | undefined;
}
