import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/product-list/product-list.component').then(
        m => m.ProductListComponent
      )
  },
  { path: 'estadisticas', loadComponent: () =>
    import('./pages/product-statistics/product-statistics.component')
      .then(m => m.ProductStatisticsComponent)
}

  
];
