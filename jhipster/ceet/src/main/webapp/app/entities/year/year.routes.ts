import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import YearResolve from './route/year-routing-resolve.service';

const yearRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/year').then(m => m.Year),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/year-detail').then(m => m.YearDetail),
    resolve: {
      year: YearResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/year-update').then(m => m.YearUpdate),
    resolve: {
      year: YearResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/year-update').then(m => m.YearUpdate),
    resolve: {
      year: YearResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default yearRoute;
