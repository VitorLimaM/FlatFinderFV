// src/app/services/auth.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { 
  Auth,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { auth, db } from '../firebase/firebase';


export interface User {
  uid: string;                    // ← ID principal do Firebase
  email: string;
  name?: string;
  role: 'admin' | 'user';

  // Propriedades temporárias para compatibilidade com código antigo
  // Vamos remover isso aos poucos quando migrarmos as outras páginas
  id?: number;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.listenAuthState();
  }

  private listenAuthState() {
    onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || undefined,
          role: 'user'
        };
        this.currentUserSubject.next(user);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  // ====================== REGISTER ======================
  async register(email: string, password: string, name?: string): Promise<boolean> {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuário registrado com sucesso!');
      return true;
    } catch (error: any) {
      console.error('Erro no registro:', error);
      alert(this.getErrorMessage(error.code));
      return false;
    }
  }

  // ====================== LOGIN ======================
  async login(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      console.error('Erro no login:', error);
      alert(this.getErrorMessage(error.code));
      return false;
    }
  }

  // ====================== LOGOUT ======================
  async logout() {
    try {
      await signOut(auth);
      this.currentUserSubject.next(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  // ====================== HELPERS ======================
  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use': return 'Este e-mail já está cadastrado!';
      case 'auth/invalid-email': return 'E-mail inválido!';
      case 'auth/weak-password': return 'A senha deve ter pelo menos 6 caracteres!';
      case 'auth/user-not-found':
      case 'auth/wrong-password': return 'E-mail ou senha incorretos!';
      default: return 'Ocorreu um erro inesperado. Tente novamente.';
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Mantido para compatibilidade com edit-profile
  updateCurrentUser(updatedUser: User) {
    this.currentUserSubject.next(updatedUser);
  }
}