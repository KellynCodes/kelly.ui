export interface HttpResponse<T = null> {
  message: string | any;
  statusCode: number | null;
  data: T | null;
}
