import { TamanhoDaTelaService } from 'app/services/tamanho-da-tela.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Input } from '@angular/core';
// menu-bottom.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { MateriasService } from 'app/services/materias.service';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
})
export class MenuBottomComponent {
  @Output() menuClick = new EventEmitter<boolean>();

  aberto = false;

  constructor(private tamanhoDaTelaService: TamanhoDaTelaService) {
    this.tamanhoDaTelaService.addListener(() => this.handleScreenSizeChange());
  }

  ngOnDestroy() {
    this.tamanhoDaTelaService.removeListener(() =>
      this.handleScreenSizeChange()
    );
  }

  abrirSideNav(aberto: boolean) {
    this.menuClick.emit(aberto);
  }

  handleScreenSizeChange(): boolean {
    return this.tamanhoDaTelaService.isMobile;
  }
}
