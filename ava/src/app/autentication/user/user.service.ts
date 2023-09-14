import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pessoa } from './Pessoa.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<Pessoa["user"] | null>(null);

  constructor() {}

  setUser(user: Pessoa["user"]) {
    // Atualize o valor no BehaviorSubject
    this.userSubject.next(user);
  }

  getUser(): Observable<Pessoa["user"] | null> {
    // Retorna um Observable que os componentes podem assinar para receber atualizações do usuário
    return this.userSubject.asObservable();
  }
}
