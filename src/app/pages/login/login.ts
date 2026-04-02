import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
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

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    const success = this.auth.login(this.email, this.password);

    if (success) {
      this.loginError = false;

      const user = this.auth.getCurrentUser();

      if (user?.role === 'admin') {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/home']);
      }

    } else {
      this.loginError = true;
    }
  }
}