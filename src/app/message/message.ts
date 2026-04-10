import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlatService } from '../services/flat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class MessageComponent implements OnInit {

  private flatService = new FlatService();

  flat: any;

  name: string = '';
  email: string = '';
  subject: string = '';
  successMessage: boolean = false;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {

    const id = this.route.snapshot.queryParamMap.get('flatId');

    if (!id) {
      console.error('Nenhum flatId fornecido!');
      return;
    }

    this.flat = await this.flatService.getFlatById(id);

    if (!this.flat) {
      console.error('Flat não encontrado para id:', id);
    } else {
      console.log('Flat encontrado:', this.flat);
    }
  }

  sendMessage() {
    this.successMessage = true;

    // limpa campos
    this.name = '';
    this.email = '';
    this.subject = '';
  }
}