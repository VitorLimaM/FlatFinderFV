import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-flat',
  templateUrl: './new-flat.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class NewFlat implements OnInit {

  flatForm!: FormGroup;
  formError: boolean = false; // 👈 erro geral

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.flatForm = this.fb.group({ 
      city: ['', [Validators.required, Validators.minLength(2)]],
      streetName: ['', [Validators.required, Validators.minLength(2)]],
      streetNumber: ['', [Validators.required, Validators.min(1)]],
      areaSize: ['', [Validators.required, Validators.min(10)]],
      hasAC: [false],
      yearBuilt: ['', [Validators.required, Validators.min(1900), Validators.max(2026)]],
      rentPrice: ['', [Validators.required, Validators.min(100)]],
      dateAvailable: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.flatForm.invalid) {
      this.formError = true;
      this.flatForm.markAllAsTouched();
      return;
    }

    this.formError = false;

    const currentUser = {
      id: 'temp-user-123',
      firstName: 'Felipe',
      lastName: 'Teste',
      email: 'felipe@teste.com'
    };

    const newFlat = {
      ...this.flatForm.value,
      ownerId: currentUser.id,
      ownerFullName: `${currentUser.firstName} ${currentUser.lastName}`,
      ownerEmail: currentUser.email,
    };

    const flats = JSON.parse(localStorage.getItem('flats') || '[]');
    flats.push(newFlat);
    localStorage.setItem('flats', JSON.stringify(flats));

    this.router.navigate(['home']);
  }

  // 👇 helper pra facilitar no HTML
  isInvalid(field: string): boolean {
    const control = this.flatForm.get(field);
    return !!(control && control.invalid && control.touched);
  }
}