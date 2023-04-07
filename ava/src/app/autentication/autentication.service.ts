import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticationService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  autenticate(user: string, password: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .post(
        'https://localhost:7003/user/login',
        {
          user: user,
          password: password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((response) => {
          const authToken = response.headers.get('x-access-token') ?? '';
          this.userService.SaveToken(authToken);
        })
      );
  }
}
