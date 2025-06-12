import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/product-list/product-list.component').then(m => m.ProductListComponent),
    canActivate: [AuthGuard] 
  },
  {
    path: 'estadisticas',
    loadComponent: () =>
      import('./pages/product-statistics/product-statistics.component').then(m => m.ProductStatisticsComponent),
    canActivate: [AuthGuard] 
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  

  },

];

