import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';

@Component({
  selector: 'app-edit-flat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Header],
  templateUrl: './edit-flat.html',
})
export class EditFlatComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  editForm!: FormGroup;
  flatId!: string;

  ngOnInit() {
    this.flatId = this.route.snapshot.paramMap.get('id')!;

    this.editForm = this.fb.group({
      city: ['', Validators.required],
      streetName: ['', Validators.required],
      streetNumber: [null, [Validators.required, Validators.min(1)]],
      areaSize: [null, [Validators.required, Validators.min(1)]],
      hasAC: [false],
      yearBuilt: [null, [Validators.required, Validators.min(1900), Validators.max(2026)]],
      rentPrice: [null, [Validators.required, Validators.min(1)]],
      dateAvailable: ['', Validators.required]
    });

    // Carrega o flat do localStorage
    const flats = JSON.parse(localStorage.getItem('flats') || '[]');
    const flatToEdit = flats.find((f: any) => f.id === this.flatId);

    if (flatToEdit) {
      this.editForm.patchValue({
        ...flatToEdit,
        dateAvailable: flatToEdit.dateAvailable ? 
          new Date(flatToEdit.dateAvailable).toISOString().split('T')[0] : ''
      });
    } else {
      alert('Flat não encontrado!');
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedFlat = {
        ...this.editForm.value,
        id: this.flatId,
        dateAvailable: new Date(this.editForm.value.dateAvailable)
      };

      // Atualiza no localStorage
      let flats = JSON.parse(localStorage.getItem('flats') || '[]');
      flats = flats.map((f: any) => f.id === this.flatId ? updatedFlat : f);
      localStorage.setItem('flats', JSON.stringify(flats));

      alert('Flat updated successfully!');
      this.router.navigate(['/home']);
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}