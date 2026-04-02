import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router, private auth: AuthService) {}

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

    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    });

    alert('Registration successful 🎉');
    this.router.navigate(['/']);
  }
}