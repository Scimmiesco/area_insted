import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pessoa } from 'app/Interfaces/Pessoa.interface';
import { IappState, getUser, setUser } from 'app/store/app.state';
import { Store } from '@ngrx/store';
import { userResponse } from 'app/Interfaces/user.Interface';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private APIURL = environment.URLAPI;

  constructor(
    private http: HttpClient,
    private store: Store<{ app: IappState }>,
    private tokenService: TokenService
  ) {
    store.select(getUser);
  }

  getUser() {
    let ra = this.tokenService.getDataFromToken().unique_name;
    let urlGetUserByRA = `${this.APIURL}user/get-user/${ra}`;
    let token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    const options = { headers: headers };

    this.http.get<userResponse>(urlGetUserByRA, options).subscribe({
      next: (response) => {
        this.setUserInStore(response.user);
      },
      error: (error) => {},
    });
  }

  setUserInStore(user: Pessoa['user']) {
    this.store.dispatch(setUser({ payload: user }));
  }
}
