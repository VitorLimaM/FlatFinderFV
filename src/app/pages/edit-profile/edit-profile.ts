// src/app/pages/edit-profile/edit-profile.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth';
import { Header } from '../header/header';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Header],
  styleUrl: './edit-profile.css'
})
export class EditProfile implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const user: User = this.auth.getCurrentUser() || {} as User;

    this.form = this.fb.group({
      name: [user.name || '', Validators.required],
      email: [user.email || '', [Validators.required, Validators.email]],
      password: [user.password || '', Validators.required],
    });
  }

  onSave() {
    if (this.form.valid) {
      const updatedUser: User = { ...this.auth.getCurrentUser(), ...this.form.value };

      // Atualiza o array de usuários
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex((u: User) => u.uid === updatedUser.uid);

      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
      }

      // Atualiza o usuário logado via AuthService
      this.auth.updateCurrentUser(updatedUser);

      alert('Profile updated successfully!');
      this.router.navigate(['/home']);
    } else {
      alert('Please fill all fields correctly.');
    }
  }
}