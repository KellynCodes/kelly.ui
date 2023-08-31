import { HttpStatusCode } from "@angular/common/http";

export interface HttpResponse<T = null> {
  message: string | null;
  statusCode: HttpStatusCode | null;
  data: T;
}
