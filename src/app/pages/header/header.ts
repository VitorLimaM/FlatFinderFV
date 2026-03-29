import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
})
export class Header implements OnInit {

  currentUser: any = {};
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user || {};
      this.isAdmin = this.currentUser.isAdmin === true;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      alert('Account deleted (simulation)');
      this.authService.logout();
      this.router.navigate(['/']);
    }
  }
}