import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { FlatService } from '../../services/flat.service';
import { Favourites } from '../favourites/favourites';
import { Myflats } from '../myflats/myflats';
import { FlatViewComponent } from '../view-flat/view-flat';


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, Header, Favourites, Myflats, FlatViewComponent],
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {

  loading = true;

  private flatService = new FlatService();

  allFlats: any[] = [];
  filteredFlats: any[] = [];

  filterCity = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minArea: number | null = null;
  maxArea: number | null = null;

  sortBy = 'city';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef // 🔥 IMPORTANTE
  ) {}

  ngOnInit() {
    this.loadFlats();
  }

  loadFlats() {
    this.loading = true;

    this.flatService.getFlats().then(flats => {
      console.log('FLATS HOME:', flats);

      this.allFlats = flats;

      this.applyFilters();

      this.loading = false;

      this.cdr.detectChanges(); // 🔥 FORÇA ATUALIZAÇÃO
    });
  }

  applyFilters() {
    let result = [...this.allFlats];

    if (this.filterCity.trim()) {
      result = result.filter((f: any) =>
        f.city.toLowerCase().includes(this.filterCity.toLowerCase())
      );
    }

    if (this.minPrice !== null) result = result.filter((f: any) => f.rentPrice >= this.minPrice!);
    if (this.maxPrice !== null) result = result.filter((f: any) => f.rentPrice <= this.maxPrice!);

    if (this.minArea !== null) result = result.filter((f: any) => f.areaSize >= this.minArea!);
    if (this.maxArea !== null) result = result.filter((f: any) => f.areaSize <= this.maxArea!);

    result.sort((a: any, b: any) => {
      if (this.sortBy === 'price') return a.rentPrice - b.rentPrice;
      if (this.sortBy === 'areaSize') return a.areaSize - b.areaSize;
      return a.city.localeCompare(b.city);
    });

    this.filteredFlats = result;
  }

  toggleFavourite(flatId: string) {
    const flat = this.allFlats.find((f: any) => f.id === flatId);

    if (flat) {
      flat.isFavourite = !flat.isFavourite;

      this.flatService.updateFlat(flatId, {
        isFavourite: flat.isFavourite
      }).then(() => {
        this.applyFilters();
        this.cdr.detectChanges(); // 🔥 atualiza na hora
      });
    }
  }

  viewFlat(id: string) {
    this.router.navigate(['/flat', id]);
  }

  message(flatId: string) {
    this.router.navigate(['/message'], { queryParams: { flatId } });
  }
}