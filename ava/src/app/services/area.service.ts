import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IappState, setUser } from 'app/store/app.state';
import { Store } from '@ngrx/store';
import { UserService } from 'app/services/user.service';
import { Pessoa } from 'app/Interfaces/Pessoa.interface';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  user!: Pessoa['user'];

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private store: Store<{ app: IappState }>
  ) {
    this.userService.getUser().subscribe({
      next: (response) => {
        if (response.success) {
          this.store.dispatch(setUser({ payload: response.user }));
          this.user = response.user;
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
      },
    });
  }
}
