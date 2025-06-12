import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  showModal = false;

  constructor(private auth: Auth, private router: Router) {}

  login() {
    this.errorMessage = '';
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => this.router.navigate(['/products']))
      .catch(() => {
        this.errorMessage = 'Correo o contraseña incorrectos';
        this.showModal = true;

        setTimeout(() => {
          this.closeModal();
        }, 2000);
      });
  }

  closeModal() {
    this.showModal = false;
  }
}
