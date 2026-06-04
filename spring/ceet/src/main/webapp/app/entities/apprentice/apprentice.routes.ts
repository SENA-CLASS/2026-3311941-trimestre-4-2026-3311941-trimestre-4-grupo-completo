import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ApprenticeResolve from './route/apprentice-routing-resolve.service';

const apprenticeRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/apprentice').then(m => m.Apprentice),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/apprentice-detail').then(m => m.ApprenticeDetail),
    resolve: {
      apprentice: ApprenticeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/apprentice-update').then(m => m.ApprenticeUpdate),
    resolve: {
      apprentice: ApprenticeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/apprentice-update').then(m => m.ApprenticeUpdate),
    resolve: {
      apprentice: ApprenticeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default apprenticeRoute;
