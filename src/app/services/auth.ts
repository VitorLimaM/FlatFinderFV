import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ==================== NOVO: Para funcionar com FlatView ====================
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadCurrentUserFromStorage();
  }

  // ====================== REGISTER (seu código original + melhoria) ======================
  register(user: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Evita duplicar email
    if (users.some((u: any) => u.email === user.email)) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    // Adiciona uid (necessário para isOwner no FlatView)
    const newUser = {
      ...user,
      uid: 'user_' + Date.now(),
      isAdmin: false
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Loga automaticamente após registrar
    this.currentUserSubject.next(newUser);
    this.login(user.email, user.password);
  }

  // ====================== LOGIN (seu código original + currentUser) ======================
  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const expiration = new Date().getTime() + (60 * 60 * 1000); // 60 minutos

      localStorage.setItem('session', JSON.stringify({ 
        user: foundUser,      // ← importante para currentUser$
        expiration 
      }));

      this.currentUserSubject.next(foundUser);
      return true;
    }

    return false;
  }

  // ====================== SEUS MÉTODOS ORIGINAIS (mantidos exatamente como você tinha) ======================
  isLoggedIn(): boolean {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    return session.expiration > new Date().getTime();
  }

  logout() {
    localStorage.removeItem('session');
    this.currentUserSubject.next(null);
  }

  // ====================== MÉTODOS AUXILIARES ======================
  private loadCurrentUserFromStorage() {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    if (session.user && session.expiration > new Date().getTime()) {
      this.currentUserSubject.next(session.user);
    }
  }

  getCurrentUserId(): string | null {
    return this.currentUserSubject.value?.uid || null;
  }
}