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
    switch (tema) {
      case 'dark': {
        if (document.documentElement.classList.contains('dark')) {
          break;
        } else {
          document.documentElement.classList.add('dark');
          break;
        }
      }
      case 'alto_contraste': {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
        }
        document.documentElement.classList.add('alto_contraste');
        break;
      }
      case 'light': {
        document.documentElement.classList.remove('alto_contraste');
        document.documentElement.classList.remove('dark');
        break;
      }
      default: {
        document.documentElement.classList.remove;
        break;
      }
    }
  }
}
