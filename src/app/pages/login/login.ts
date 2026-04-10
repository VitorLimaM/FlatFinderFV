import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  loginError = false;
  isLoading = false;        // ← Novo

  constructor(
    private router: Router, 
    private auth: AuthService
  ) {}

  async login() {
    if (!this.email || !this.password) {
      alert('Email and password are required');
      return;
    }

    this.isLoading = true;
    this.loginError = false;

    try {
      const success = await this.auth.login(this.email, this.password);

      if (success) {
        this.loginError = false;
        
        // Por enquanto todos vão para /home (vamos melhorar o redirecionamento depois)
        this.router.navigate(['/home']);
        
      } else {
        this.loginError = true;
      }
    } catch (error) {
      this.loginError = true;
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}