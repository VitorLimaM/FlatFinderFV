import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { FlatService } from '../../services/flat.service';

@Component({
  selector: 'app-my-flats',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './myflats.html',
  styleUrl: './myflats.css'
})
export class Myflats implements OnInit {

  loading = true;
  myFlats: any[] = [];

  private flatService = new FlatService();

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadFlats();
  }

  loadFlats() {
    this.loading = true;

    this.flatService.getFlats().then(flats => {
      console.log('FLATS:', flats);

      this.myFlats = flats;

      this.loading = false;

      this.cdr.detectChanges(); // 🔥 FORÇA ATUALIZAÇÃO DA TELA
    });
  }

  deleteFlat(id: string) {
    this.flatService.deleteFlat(id).then(() => {
      this.myFlats = this.myFlats.filter(f => f.id !== id);
      this.cdr.detectChanges();
    });
  }

  viewFlat(id: string) {
    this.router.navigate(['/view-flat', id]);
  }

  editFlat(id: string) {
    this.router.navigate(['/edit-flat', id]);
  }

  goToNewFlat() {
    this.router.navigate(['/new-flat']);
  }
}