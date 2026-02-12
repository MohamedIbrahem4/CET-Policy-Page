import { Routes } from '@angular/router';

export const routes: Routes = [

    {
      path: 'CetPolicy',
      loadComponent: () => import('./components/ploicy/ploicy.component').then(m => m.PloicyComponent)
    },
     {
      path: 'RshPolicy',
      loadComponent: () => import('./components/rsh-policy/rsh-policy.component').then(m => m.RshPolicyComponent)
    },

]
