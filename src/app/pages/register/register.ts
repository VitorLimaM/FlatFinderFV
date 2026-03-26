import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

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

    // Verifica se email já existe
    if (users.find((u: any) => u.email === this.email)) {
      alert('Email already registered');
      return;
    }

    // Salva o novo usuário
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! 🎉');
    this.router.navigate(['/']); // volta para o login
  }
}