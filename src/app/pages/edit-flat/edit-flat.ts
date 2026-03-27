import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlatService } from '../../flatservice';
import { Flat } from '../../Models/flat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-flat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-flat.html',
})
export class EditFlatComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private flatService = inject(FlatService);
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

    // Carregar dados atuais
    this.flatService.getFlatById(this.flatId).subscribe(flat => {
      if (flat) {
        this.editForm.patchValue({
          ...flat,
          dateAvailable: flat.dateAvailable instanceof Date 
            ? flat.dateAvailable.toISOString().split('T')[0] 
            : flat.dateAvailable
        });
      }
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedFlat = {
        ...this.editForm.value,
        dateAvailable: new Date(this.editForm.value.dateAvailable)
      };

      this.flatService.updateFlat(this.flatId, updatedFlat).subscribe(() => {
        alert('Flat atualizado com sucesso!');
        this.router.navigate(['/home']);
      });
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}