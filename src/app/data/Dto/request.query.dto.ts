export interface PaginationQueryDto {
  page: number;

  limit: number;

  year?: number;

  month?: number;

  IsFetchByMonth?: boolean;

  keyword: string;
}
