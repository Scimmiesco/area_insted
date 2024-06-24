import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'app/services/token.service';
@Injectable({
  providedIn: 'root',
})
export class AreaAuthGuard {
  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(): boolean {
    if (
      sessionStorage.getItem('isAuthenticated') === '1' &&
      this.tokenService.isTokenValid(localStorage.getItem('token') || '')
    ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
