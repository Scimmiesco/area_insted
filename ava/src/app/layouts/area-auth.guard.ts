import { AutenticationService } from 'app/autentication/autentication.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'app/services/token.service';
@Injectable({
  providedIn: 'root',
})
export class AreaAuthGuard {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.isTokenValid()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
