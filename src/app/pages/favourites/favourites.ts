import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { FlatService } from '../../services/flat.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css'
})
export class Favourites implements OnInit {

  loading = true;

  private flatService = new FlatService();

  favouriteFlats: any[] = [];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef // 🔥 IMPORTANTE
  ) {}

  ngOnInit() {
    this.loadFavourites();
  }

  loadFavourites() {
    this.loading = true;

    this.flatService.getFlats().then(flats => {
      console.log('FAVOURITES:', flats);

      this.favouriteFlats = flats.filter((f: any) => f.isFavourite);

      this.loading = false;

      this.cdr.detectChanges(); // 🔥 força atualização
    });
  }

  removeFavourite(id: string) {
    this.flatService.updateFlat(id, { isFavourite: false }).then(() => {

      this.favouriteFlats = this.favouriteFlats.filter(f => f.id !== id);

      this.cdr.detectChanges(); // 🔥 atualiza na hora
    });
  }

  viewFlat(id: string) {
    this.router.navigate(['/view-flat', id]);
  }
}