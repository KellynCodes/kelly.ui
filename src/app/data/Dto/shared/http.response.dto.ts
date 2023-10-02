import { HttpStatusCode } from "@angular/common/http";

export interface HttpResponse<T = null> {
  message: string | any;
  isSuccessful: boolean;
  data: T | null;
}
