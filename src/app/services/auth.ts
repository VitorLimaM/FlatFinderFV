import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  register(user: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const expiration = new Date().getTime() + (60 * 60 * 1000);
      localStorage.setItem('session', JSON.stringify({ expiration }));
      return true;
    }

    return false;
  }

  isLoggedIn(): boolean {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    return session.expiration > new Date().getTime();
  }

  logout() {
    localStorage.removeItem('session');
  }
}