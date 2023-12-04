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

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  aberto = false;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  abrirSideNav(aberto: boolean) {
    this.menuClick.emit(aberto);
  }
}
