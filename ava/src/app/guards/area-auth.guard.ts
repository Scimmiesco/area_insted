import { AutenticationService } from 'app/services/autentication.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'app/services/token.service';
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
