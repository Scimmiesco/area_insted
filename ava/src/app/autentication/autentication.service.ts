import { FormGroup, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import {
  LoginInterface,
  ResponseInterface,
} from 'app/pages/login/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AutenticationService {
  private sessionStorageKey = 'isAuthenticated';
  private apiUrl = 'https://localhost:7003/';

  constructor(private http: HttpClient) {}

  auth(loginRequest: LoginInterface): Observable<ResponseInterface> {
    const json = {
      login: loginRequest.login as string,
      password: loginRequest.password as string,
    };
    const loginUrl = `${this.apiUrl}user/auth`;

    // Fazer a solicitação de autenticação
    return this.http.post<ResponseInterface>(`${loginUrl}`, json).pipe(
      map((response: ResponseInterface) => {
        // Verificar se a autenticação foi bem-sucedida
        if (response.success) {
          sessionStorage.setItem(this.sessionStorageKey, 'true');
         }
        return response;
      })
    );
  }

  getIsAuthenticated(): boolean {
    const value = sessionStorage.getItem(this.sessionStorageKey);
    return value === 'true'; // Converte a string armazenada de volta em booleano
  }
}
