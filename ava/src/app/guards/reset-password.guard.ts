import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from 'app/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordAuthGuard {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = route.queryParamMap.get('token') || '';

    if (token !== null && this.tokenService.validaTokenUrl(token)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
