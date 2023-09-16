import { UserService } from 'app/autentication/user/user.service';
import { Component } from '@angular/core';
import { Pessoa } from 'app/autentication/user/Pessoa.interface';
import { Router } from "@angular/router"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user!: Pessoa["user"];
  status: boolean = true;

  constructor(private router: Router) {

  }

  ngOnInit() {

    const localStorageKey = localStorage.key(0);
    if (localStorageKey) {
      this.user = JSON.parse(localStorage.getItem(localStorageKey) ?? '{}');
    }
  }

  logout() {
    sessionStorage.setItem('isAuthenticated','false')
    sessionStorage.clear();
    // localStorage.removeItem(this.user.nrCpf)
    this.router.navigate(['/'])
  }
}
