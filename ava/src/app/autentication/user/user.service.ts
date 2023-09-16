import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pessoa } from './Pessoa.interface';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private user$ = new BehaviorSubject<Pessoa["user"]>(  );

  constructor() {
  Pessoa{user={
      idUser= 0,
      idAddress= 0,
      nmUser= 'Default',
      nrRegister= '100000000',
      nrCpf= '100000000',
      nrRg= 0,
      nmExpedition= 'sspms',
      dtBirthdate= '2000-01-01',
      nmSex= 'm',
      nmPhone1= '67999999999',
      nmPhone2= '67999999999',
      nmEmail= 'email@email.com',
      imgFile= null,
      snTeacher= false,
    }}
    }

  setUser(user: Pessoa["user"]) {
    this.user$.next(user);
  }

  getUser(): Observable<Pessoa["user"]> {
    // Retorna um Observable que os componentes podem assinar para receber atualizações do usuário
    return this.user$.asObservable();
  }
}
