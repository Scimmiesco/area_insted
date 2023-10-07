import { AutenticationService } from 'app/services/autentication.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'app/services/token.service';
@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard {
  isAuthenticated = sessionStorage.getItem('isAuthenticated') as string | null;

  constructor(private tokenService: TokenService, private router: Router) {
   
  }

  canActivate(): boolean {
    if (this.isAuthenticated !== '1' || null) {
      return true;
    } else {
      this.router.navigate(['/area/']);
      return false;
    }
  }
}
