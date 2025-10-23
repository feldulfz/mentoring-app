import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];