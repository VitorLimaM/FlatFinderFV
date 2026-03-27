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

  flats: any[] = [];
  user: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.flats = JSON.parse(localStorage.getItem('flats') || '[]');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // Garante que cada flat tenha um ID (caso ainda não tenha)
    this.flats.forEach(flat => {
      if (!flat.id) flat.id = 'flat_' + Date.now() + Math.random();
    });
  }

  // ====================== NOVO: Abre o Flat View ======================
  viewFlat(flatId: string) {
    this.router.navigate(['/view-flat', flatId]);
  }

  // ====================== Toggle Favourite (simples por enquanto) ======================
  toggleFavourite(flatId: string) {
    const flat = this.flats.find(f => f.id === flatId);
    if (flat) {
      flat.isFavourite = !flat.isFavourite;
      localStorage.setItem('flats', JSON.stringify(this.flats));
      
      alert(flat.isFavourite 
        ? 'Added to favourites ❤️' 
        : 'Removed from favourites');
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  goToEdit() {
    this.router.navigate(['/edit-profile']);
  }
}