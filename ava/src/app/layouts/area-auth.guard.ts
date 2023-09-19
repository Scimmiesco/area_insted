import { AutenticationService } from 'app/autentication/autentication.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AreaAuthGuard  {
  constructor(
    private autenticationService: AutenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.autenticationService.getIsAuthenticated()) {
      return true; 
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
