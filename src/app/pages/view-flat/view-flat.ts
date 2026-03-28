import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flat-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-flat.html',
})
export class FlatViewComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  flat: any = null;           
  isOwner = false;
  currentUserId: string | null = null;

  ngOnInit() {
    const flatId = this.route.snapshot.paramMap.get('id');
    console.log('🔍 ID recebido na URL:', flatId);   // ← para debug

    if (!flatId) {
      console.log('❌ Nenhum ID encontrado na URL');
      return;
    }

    // Carrega direto do localStorage (igual ao seu Home)
    const flats = JSON.parse(localStorage.getItem('flats') || '[]');
    console.log('📦 Flats no localStorage:', flats);

    this.flat = flats.find((f: any) => f.id === flatId);

    if (this.flat) {
      console.log('✅ Flat encontrado!', this.flat);
      // Verifica se o usuário logado é o dono
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.currentUserId = user.uid || user.id;
      this.isOwner = this.flat.ownerId === this.currentUserId || this.flat.ownerUid === this.currentUserId;
    } else {
      console.log('❌ Flat NÃO encontrado com ID:', flatId);
    }
  }

  editFlat() {
    if (this.flat?.id) {
      this.router.navigate(['/edit-flat', this.flat.id]);
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}