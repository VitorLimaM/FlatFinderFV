import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { NewFlat } from './pages/new-flat/new-flat';
import { EditProfile } from './pages/edit-profile/edit-profile'; 
import { FlatViewComponent } from './pages/view-flat/view-flat';
import { EditFlatComponent } from './pages/edit-flat/edit-flat';
import { Myflats } from './pages/myflats/myflats';
import { Favourites } from './pages/favourites/favourites';
import { AdminUserComponent } from './adm/adm';
import { MessageComponent } from './message/message';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminUserComponent },
  { path: 'new-flat', component: NewFlat },
  { path: 'edit-profile', component: EditProfile },
  { path: 'view-flat/:id', component: FlatViewComponent },
  { path: 'edit-flat/:id', component: EditFlatComponent },
  { path: 'my-flats', component: Myflats },
  { path: 'favourites', component: Favourites },
  { path: 'message', component: MessageComponent },
];