import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';  

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, RouterLink, Header],
  templateUrl: './favourites.html',
})
export class Favourites implements OnInit {

  favouriteFlats: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const allFlats = JSON.parse(localStorage.getItem('flats') || '[]');
    
    // Pega apenas os flats que estão como favoritos
    this.favouriteFlats = allFlats.filter((flat: any) => flat.isFavourite === true);

    console.log('Flats favoritos carregados:', this.favouriteFlats); // para debug
  }

  removeFavourite(flatId: string) {
    if (confirm('Remove from favourites?')) {
      let allFlats = JSON.parse(localStorage.getItem('flats') || '[]');
      const flat = allFlats.find((f: any) => f.id === flatId);
      if (flat) flat.isFavourite = false;

      localStorage.setItem('flats', JSON.stringify(allFlats));

      // Atualiza a lista
      this.favouriteFlats = this.favouriteFlats.filter(f => f.id !== flatId);
    }
  }

  viewFlat(flatId: string) {
    this.router.navigate(['/view-flat', flatId]);
  }
}