import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  isAdmin = false;
  adminPassword = '';
  isLoading = false;        // ← Novo: para melhorar UX

  constructor(
    private router: Router, 
    private auth: AuthService
  ) {}

  async register() {
    // Validações básicas
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

    this.isLoading = true;

    try {
      // No Firebase Auth não passamos mais o objeto + senha admin
      // Vamos registrar apenas com email e senha primeiro
      const success = await this.auth.register(this.email, this.password, this.name);

      if (success) {
        alert('Registration successful 🎉\n\nYou can now login.');
        this.router.navigate(['/login']);   // Redireciona para login (mais seguro)
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}