import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pessoa } from 'app/autentication/user/Pessoa.interface';
import { IappState } from 'app/store/app.state';
import { Store } from '@ngrx/store';
import { userResponse } from 'app/userInterface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7003/';

  constructor(
    private http: HttpClient,
    private store: Store<{ app: IappState }>,
    private tokenService: TokenService
  ) {}

  getUser(): Observable<userResponse> {
    let ra = this.tokenService.getDataFromToken('ra');
    let urlGetUserByRA = `${this.apiUrl}user/get-user/${ra}`;
    let token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    const options = { headers: headers };

    return this.http.get<userResponse>(urlGetUserByRA, options);
  }
}
