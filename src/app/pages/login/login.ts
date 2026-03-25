import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';   

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],  
  templateUrl: './login.html',

})
export class LoginComponent {


  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}  
  login() {
    console.log('Tentando login com:', this.email, this.password);
  }
}