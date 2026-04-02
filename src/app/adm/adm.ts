import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adm.html',
})
export class AdminUserComponent implements OnInit {

  users: any[] = [];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}