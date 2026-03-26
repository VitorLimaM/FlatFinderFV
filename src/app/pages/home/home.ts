// src/app/pages/home/home.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  imports: [RouterLink, CommonModule, NgFor],
})
export class HomeComponent implements OnInit {

  flats: any[] = []; // lista de flats
  user: any = {};    // usuário do localStorage

  constructor(private router: Router) {}

  ngOnInit() {
    // Carrega flats e usuário do localStorage
    this.flats = JSON.parse(localStorage.getItem('flats') || '[]');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  goToEdit() {
    this.router.navigate(['/edit-profile']);
  }
}