import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  htmlRoot: HTMLElement = <HTMLElement>document.getElementsByTagName('html')[0];

  private temaSubject = new BehaviorSubject<string>(
    localStorage.getItem('tema') || 'light'
  );

  tema$: Observable<string> = this.temaSubject.asObservable();

  mudarTema(novoTema: string) {
    this.temaSubject.next(novoTema);
    localStorage.setItem('tema', novoTema);
  }

}
