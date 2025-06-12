import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private auth: Auth, private router: Router) {}

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
