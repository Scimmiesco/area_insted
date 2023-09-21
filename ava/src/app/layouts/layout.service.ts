import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IappState } from 'app/store/app.state';
import { Store } from '@ngrx/store';
import { UserService } from 'app/services/user.service';
import { Pessoa } from 'app/autentication/user/Pessoa.interface';

@Injectable({
  providedIn: 'root',
})
export class layoutService {
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private store: Store<{ app: IappState }>
  ) {}

  user!: Pessoa['user'];

  getUser() {
    this.userService.getUser().subscribe({
      next: (response) => {
        if (response.success) console.log(response.message);
        return (this.user = response.user);
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
      },
    });
  }
}
