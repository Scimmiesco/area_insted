import { Component } from '@angular/core';
import { TemaService } from './services/tema.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'Área do aluno - INSTED';

  constructor(public temaService: TemaService) {
    if (
      localStorage['tema'] === 'dark' ||
      (!('tema' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    temaService.tema$.subscribe((temas) => {
      this.aplicaTemas(temas);
    });
  }

  aplicaTemas(tema: string) {
    switch (tema) {
      case 'dark':
        if (document.documentElement.classList.contains('dark')) {
          break;
        }
        document.documentElement.classList.add('dark');
        break;

      case 'light':
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.remove('alto_contraste');
        break;

      case 'alto_contraste':
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('alto_contraste');
        } else if (
          document.documentElement.classList.contains('alto_contraste')
        ) {
          document.documentElement.classList.remove('alto_contraste');
        } else {
          document.documentElement.classList.add('alto_contraste');
        }
        break;

      default:
        break;
    }
  }
}
