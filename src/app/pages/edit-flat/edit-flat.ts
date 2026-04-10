import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { FlatService } from '../../services/flat.service';

@Component({
  selector: 'app-edit-flat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Header],
  templateUrl: './edit-flat.html',
  styleUrl: './edit-flat.css'
})
export class EditFlatComponent implements OnInit {

  private flatService = new FlatService();
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  editForm = this.fb.group({
    city: ['', Validators.required],
    streetName: ['', Validators.required],
    streetNumber: [''],
    areaSize: [''],
    hasAC: [false],
    yearBuilt: [''],
    rentPrice: [''],
    dateAvailable: ['']
  });

  flatId!: string;

  async ngOnInit() {
    this.flatId = this.route.snapshot.paramMap.get('id')!;
    const flat = await this.flatService.getFlatById(this.flatId);

    if (flat) {
      this.editForm.patchValue(flat as any);
    }
  }

  async onSubmit() {
    await this.flatService.updateFlat(this.flatId, this.editForm.value);
    this.router.navigate(['/home']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}