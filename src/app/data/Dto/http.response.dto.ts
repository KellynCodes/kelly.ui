export interface HttpResponse<T = null> {
  message: string | any;
  statusCode: number;
  data: T;
}
