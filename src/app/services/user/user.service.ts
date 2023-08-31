import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../../data/Dto/user/user.dto';
import { Observable } from 'rxjs';
import { HttpResponse } from 'src/app/data/Dto/auth/http.response';
import { PaginationQueryDto } from '../../data/Dto/request.query.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  UpdateUser(id: string, model: UserDto): Observable<HttpResponse<UserDto>> {
    const url: string = `${environment.apiUrl}/user/${id}`;
    return this.http.put<HttpResponse<UserDto>>(url, model);
  }
  PatchUpdateUser(id: string, model: UserDto) {}

  getUser(id: string): Observable<HttpResponse<UserDto>> {
    const url: string = `${environment.apiUrl}/user/${id}`;
    return this.http.get<HttpResponse<UserDto>>(url);
  }

  getUsers(query: PaginationQueryDto): Observable<HttpResponse<UserDto[]>> {
    const url: string = `${environment.apiUrl}/user/get-all?page=${query.page}&limit=${query.limit}&keyword=${query.keyword}`;
    return this.http.get<HttpResponse<UserDto[]>>(url);
  }

  deleteUser(id: string): Observable<HttpResponse> {
    const url: string = `${environment.apiUrl}/user/${id}`;
    return this.http.delete<HttpResponse>(url);
  }
}
