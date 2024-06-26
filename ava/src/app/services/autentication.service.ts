import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  LoginInterface,
  ResponseInterface,
} from 'app/Interfaces/login.interface';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutenticationService {
  private sessionStorageKey = 'isAuthenticated';
  private APIURL = environment.URLAPI;

  constructor(private http: HttpClient) {}

  auth(loginRequest: LoginInterface): Observable<ResponseInterface> {
    const json = {
      login: loginRequest.login as string,
      password: loginRequest.senhaCriptografada as string,
    };
    const loginUrl = `${this.APIURL}auth`;

    return this.http.post<ResponseInterface>(`${loginUrl}`, json).pipe(
      map((response: ResponseInterface) => {
        if (response.success) {
          sessionStorage.setItem(this.sessionStorageKey, '1');
        }
        return response;
      })
    );
  }

  getIsAuthenticated(): boolean {
    const value = sessionStorage.getItem(this.sessionStorageKey);
    return value === '1';
  }
}
