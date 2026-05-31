import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../../dtos/user-dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly baseUrl = '/users';

  private http = inject(HttpClient);

  getAll() {
    return this.http.get<UserDTO[]>(this.baseUrl);
  }
}
