import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'AVA Insted';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  reason = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Fechar o mat-sidenav sempre que a rota for alterada
        this.sidenav.close();
      }
    });
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }
}
