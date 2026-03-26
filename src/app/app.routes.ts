import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { NewFlat } from './pages/new-flat/new-flat';
import { EditProfile } from './pages/edit-profile/edit-profile'; // ⬅️ importar

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-flat', component: NewFlat },
  { path: 'edit-profile', component: EditProfile } // ⬅️ nova rota
];