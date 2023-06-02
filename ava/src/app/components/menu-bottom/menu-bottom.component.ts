import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.css']
})
export class MenuBottomComponent {
  @Output() menuClick = new EventEmitter<boolean>();

  abrirSideNav() {
    this.menuClick.emit(true);
  }
}


