import { Routes } from '@angular/router';

export const routes: Routes = [

    {
      path: '',
      loadComponent: () => import('./components/ploicy/ploicy.component').then(m => m.PloicyComponent)
    },

]
