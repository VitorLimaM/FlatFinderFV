import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadCurrentUserFromStorage();
  }

  // ✅ REGISTER
  register(user: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((u: any) => u.email === user.email)) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    // 👑 primeiro usuário vira admin
    const role = users.length === 0 ? 'admin' : 'user';

    const newUser = {
      ...user,
      id: Date.now(),
      uid: 'user_' + Date.now(),
      role: role
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.currentUserSubject.next(newUser);
    this.login(user.email, user.password);
  }

  // ✅ LOGIN
  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const expiration = new Date().getTime() + (60 * 60 * 1000);

      localStorage.setItem('session', JSON.stringify({
        user: foundUser,
        expiration
      }));

      this.currentUserSubject.next(foundUser);
      return true;
    }

    return false;
  }

  // ✅ ADMIN CHECK
  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  // ✅ SESSION
  isLoggedIn(): boolean {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    return session.expiration > new Date().getTime();
  }

  logout() {
    localStorage.removeItem('session');
    this.currentUserSubject.next(null);
  }

  private loadCurrentUserFromStorage() {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    if (session.user && session.expiration > new Date().getTime()) {
      this.currentUserSubject.next(session.user);
    }
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}