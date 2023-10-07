import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pessoa } from 'app/Interfaces/Pessoa.interface';
import { IappState, setUser } from 'app/store/app.state';
import { Store } from '@ngrx/store';
import { userResponse } from 'app/Interfaces/user.Interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://webapi20230927142946.azurewebsites.net/';

  constructor(
    private http: HttpClient,
    private store: Store<{ app: IappState }>,
    private tokenService: TokenService
  ) { }

  getUser(){
    let ra = this.tokenService.getDataFromToken('ra');
    let urlGetUserByRA = `${this.apiUrl}user/get-user/${ra}`;
    let token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    const options = { headers: headers };

    this.http.get<userResponse>(urlGetUserByRA, options).subscribe({
      next: (Response) => {
        if (Response.success) {
          this.store.dispatch(setUser({ payload: Response.user }))
        }
      },
      error: (error) => {
        if (error.status === 404) {
          console.log('usuário não encontrado');
        }
        if (error.status === 401) {
          console.log('usuário não autorizado');
        }
        if (error.status === 500) {
          console.log('Erro na requisição');
        }
      }
    });
  }
}
