import { UserService } from '../autentication/user/user.service';
import { Component } from '@angular/core';
import { Pessoa } from '../autentication/user/Pessoa.interface';
import { Router } from "@angular/router"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user!: Pessoa["user"];

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {

    const localStorageKey = localStorage.key(0);
    if (localStorageKey) {
      this.user = JSON.parse(localStorage.getItem(localStorageKey) ?? '{}');
    }
  }

  logout() {
    localStorage.removeItem(this.user.nrCpf)
    this.router.navigate(['/'])
  }
}
