import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-flats',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './myflats.html',
})
export class Myflats implements OnInit {

  myFlats: any[] = [];
  currentUser: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const allFlats = JSON.parse(localStorage.getItem('flats') || '[]');

    // Filtra apenas os flats do usuário logado
    this.myFlats = allFlats.filter((flat: any) => 
      flat.ownerId === this.currentUser.uid || 
      flat.ownerUid === this.currentUser.uid
    );
  }

  // ==================== AÇÕES ====================
  viewFlat(flatId: string) {
    this.router.navigate(['/view-flat', flatId]);
  }
  
  editFlat(flatId: string) {
    this.router.navigate(['/edit-flat', flatId]);
  }

  deleteFlat(flatId: string) {
    if (confirm('Tem certeza que deseja excluir este flat?')) {
      let allFlats = JSON.parse(localStorage.getItem('flats') || '[]');
      allFlats = allFlats.filter((f: any) => f.id !== flatId);
      localStorage.setItem('flats', JSON.stringify(allFlats));

      // Atualiza a lista local
      this.myFlats = this.myFlats.filter(f => f.id !== flatId);
      alert('Flat excluído com sucesso!');
    }
  }

  goToNewFlat() {
    this.router.navigate(['/new-flat']);
  }
}