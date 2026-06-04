import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import DayResolve from './route/day-routing-resolve.service';

const dayRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/day').then(m => m.Day),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/day-detail').then(m => m.DayDetail),
    resolve: {
      day: DayResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/day-update').then(m => m.DayUpdate),
    resolve: {
      day: DayResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/day-update').then(m => m.DayUpdate),
    resolve: {
      day: DayResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dayRoute;
