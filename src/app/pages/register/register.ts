import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';   // ← RouterLink adicionado
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],        // ← RouterLink adicionado aqui
  templateUrl: './register.html'   // ou './register.html' conforme seu caso
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('All fields are required');
      return;
    }
    if (!this.email.includes('@')) {
      alert('Invalid email');
      return;
    }
    if (this.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.email === this.email)) {
      alert('Email already registered');
      return;
    }

    this.auth.register({ name: this.name, email: this.email, password: this.password });

    alert('Registration successful!');
    this.router.navigate(['/home']);
  }
}