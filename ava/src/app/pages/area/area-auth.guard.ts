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
      return true; // Permite o acesso à rota dentro da área
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login se não estiver autenticado
      return false;
    }
  }
}
