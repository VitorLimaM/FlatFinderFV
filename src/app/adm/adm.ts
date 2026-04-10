import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../services/auth';

@Component({
  selector: 'app-adminuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adm.html',
})
export class AdminUserComponent implements OnInit {

  users: User[] = [];
  currentUser: User | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.loadUsers();
  }

  loadUsers() {
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // Se for admin, mostra todos; senão só mostra ele
    if (this.currentUser?.role === 'admin') {
      this.users = allUsers;
    } else if (this.currentUser) {
      this.users = allUsers.filter(u => u.uid === this.currentUser!.uid);
    }
  }

  deleteUser(id: number) {
    // Apenas admin pode deletar outros usuários
    if (this.currentUser?.role !== 'admin') return;

    this.users = this.users.filter(u => u.id !== id);

    // Atualiza o localStorage completo
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    this.loadUsers(); // recarrega a lista
  }
}