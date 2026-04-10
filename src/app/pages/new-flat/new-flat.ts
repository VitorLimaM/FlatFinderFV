import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlatService } from '../../services/flat.service';
import { Header } from '../header/header';

@Component({
  selector: 'app-new-flat',
  templateUrl: './new-flat.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Header],
  styleUrl: './new-flat.css'
})
export class NewFlat implements OnInit {

  private flatService = new FlatService();

  flatForm!: FormGroup;
  formError = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.flatForm = this.fb.group({
      city: ['', Validators.required],
      streetName: ['', Validators.required],
      streetNumber: ['', Validators.required],
      areaSize: ['', Validators.required],
      hasAC: [false],
      yearBuilt: ['', Validators.required],
      rentPrice: ['', Validators.required],
      dateAvailable: ['', Validators.required]
    });
  }

  async onSave() {
    if (this.flatForm.invalid) {
      this.formError = true;
      this.flatForm.markAllAsTouched();
      return;
    }

    const newFlat = {
      ...this.flatForm.value,
      dateAvailable: new Date(this.flatForm.value.dateAvailable).toISOString()
    };

    await this.flatService.addFlat(newFlat);
    this.router.navigate(['home']);
  }

  isInvalid(field: string): boolean {
    const control = this.flatForm.get(field);
    return !!(control && control.invalid && control.touched);
  }
}