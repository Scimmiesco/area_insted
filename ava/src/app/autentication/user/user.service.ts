import { Pessoa } from './Pessoa.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() { }

  setUser(user: Pessoa["user"]) {
    localStorage.setItem(user.nrCpf,JSON.stringify(user));

  }
}
