import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AreaAuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('isAuthenticated') === '1') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
