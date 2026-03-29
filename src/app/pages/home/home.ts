// src/app/pages/home/home.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { Header } from '../header/header';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, Header],  
})
export class HomeComponent implements OnInit {

  allFlats: any[] = [];
  filteredFlats: any[] = [];

  // Filtros
  filterCity: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minArea: number | null = null;
  maxArea: number | null = null;

  // Ordenação
  sortBy: string = 'city';

  user: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.allFlats = JSON.parse(localStorage.getItem('flats') || '[]');

    this.allFlats.forEach(flat => {
      if (!flat.id) flat.id = 'flat_' + Date.now() + Math.random().toString(36);
      if (flat.isFavourite === undefined) flat.isFavourite = false;
    });

    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.allFlats];

    if (this.filterCity.trim()) {
      result = result.filter(f => 
        f.city.toLowerCase().includes(this.filterCity.toLowerCase())
      );
    }

    if (this.minPrice !== null) result = result.filter(f => f.rentPrice >= this.minPrice!);
    if (this.maxPrice !== null) result = result.filter(f => f.rentPrice <= this.maxPrice!);

    if (this.minArea !== null) result = result.filter(f => f.areaSize >= this.minArea!);
    if (this.maxArea !== null) result = result.filter(f => f.areaSize <= this.maxArea!);

    result.sort((a, b) => {
      if (this.sortBy === 'price') return a.rentPrice - b.rentPrice;
      if (this.sortBy === 'areaSize') return a.areaSize - b.areaSize;
      return a.city.localeCompare(b.city);
    });

    this.filteredFlats = result;
  }

  viewFlat(flatId: string) {
    this.router.navigate(['/flat', flatId]);
  }

 toggleFavourite(flatId: string) {
    const flat = this.allFlats.find(f => f.id === flatId);
    if (flat) {
      flat.isFavourite = !flat.isFavourite;

      // Salva no localStorage
      localStorage.setItem('flats', JSON.stringify(this.allFlats));

      // Atualiza a tabela imediatamente
      this.applyFilters();
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}