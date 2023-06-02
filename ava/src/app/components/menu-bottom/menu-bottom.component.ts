// menu-bottom.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.css']
})
export class MenuBottomComponent {
  @Output() menuClick = new EventEmitter<boolean>();

  aberto = false;

  abrirSideNav(aberto: boolean) {
    this.menuClick.emit(aberto);
  }
}
