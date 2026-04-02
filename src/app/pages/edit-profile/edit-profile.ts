// src/app/pages/edit-profile/edit-profile.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class EditProfile implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.form = this.fb.group({
      name: [user.name || '', Validators.required],
      email: [user.email || '', [Validators.required, Validators.email]],
      password: [user.password || '', Validators.required],
    });
  }

  onSave() {
    if (this.form.valid) {
      localStorage.setItem('user', JSON.stringify(this.form.value));
      alert('Profile updated successfully!');
      this.router.navigate(['/home']);
    } else {
      alert('Please fill all fields correctly.');
    }
  }
}