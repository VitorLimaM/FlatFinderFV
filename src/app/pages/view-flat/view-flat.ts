import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { FlatService } from '../../services/flat.service';

@Component({
  selector: 'app-flat-view',
  standalone: true,
  imports: [CommonModule, Header, FormsModule],
  templateUrl: './view-flat.html',
  styleUrl: './view-flat.css'
})
export class FlatViewComponent implements OnInit {

  private flatService = new FlatService();
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  flat: any = null;
  isOwner = false;
  loading = true;

  // 🔥 message state
  message = {
    name: '',
    email: '',
    text: ''
  };

  // 🔥 success feedback
  successMessage = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Flat ID não fornecido!');
      this.loading = false;
      return;
    }

    this.flatService.getFlatById(id).then(flat => {
      this.flat = flat;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  editFlat() {
    if (this.flat?.id) {
      this.router.navigate(['/edit-flat', this.flat.id]);
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  // 🔥 send message
  sendMessage() {
    console.log('Mensagem enviada:', this.message);

    // mostra mensagem
    this.successMessage = true;

    // limpa o formulário
    this.message = {
      name: '',
      email: '',
      text: ''
    };

    // some depois de 3 segundos
    setTimeout(() => {
      this.successMessage = false;
    }, 3000);
  }
}