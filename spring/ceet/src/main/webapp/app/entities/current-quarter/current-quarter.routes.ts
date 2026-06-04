import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import CurrentQuarterResolve from './route/current-quarter-routing-resolve.service';

const currentQuarterRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/current-quarter').then(m => m.CurrentQuarter),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/current-quarter-detail').then(m => m.CurrentQuarterDetail),
    resolve: {
      currentQuarter: CurrentQuarterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/current-quarter-update').then(m => m.CurrentQuarterUpdate),
    resolve: {
      currentQuarter: CurrentQuarterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/current-quarter-update').then(m => m.CurrentQuarterUpdate),
    resolve: {
      currentQuarter: CurrentQuarterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default currentQuarterRoute;
