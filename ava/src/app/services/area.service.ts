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

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private store: Store<{ app: IappState }>
  ) { }

}
