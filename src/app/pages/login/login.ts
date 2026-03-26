import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router) {}

  login() {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    const user = savedUsers.find((u: any) => 
      u.email === this.email && u.password === this.password
    );

    if (user) {
      this.loginError = false;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));

      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
    }
  }
}