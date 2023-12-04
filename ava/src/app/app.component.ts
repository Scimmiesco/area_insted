import { Component } from '@angular/core';
import { TemaService } from './services/tema.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Área do aluno - INSTED';
  constructor(temaService: TemaService) {
    if (
      localStorage['tema'] === 'dark' ||
      (!('tema' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    temaService.tema$.subscribe((value) => {
      this.modoEscuro(value);
    });
  }
  modoEscuro(tema: string) {
    tema.toString() === 'dark' ? document.documentElement.classList.add('dark') : 
    document.documentElement.classList.remove('dark');;
    
    ;
  }
}
