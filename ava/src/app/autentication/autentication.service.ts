import { FormGroup, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { LoginInterface, ResponseInterface } from 'app/pages/login/login.interface';


@Injectable({
  providedIn: 'root',
})
export class AutenticationService {

  private apiUrl = "https://localhost:7003/"

  constructor(private http: HttpClient) { }

  auth(loginRequest: LoginInterface): Observable<ResponseInterface> {
    const json = {
      "login": loginRequest.login as string,
      "password": loginRequest.password as string
    }
    const loginUrl = `${this.apiUrl}user/auth`;
    return this.http.post<ResponseInterface>(`${loginUrl}`, json)
  }
}
