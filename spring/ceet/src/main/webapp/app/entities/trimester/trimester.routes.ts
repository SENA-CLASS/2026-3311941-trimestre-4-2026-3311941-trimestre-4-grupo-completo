import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import TrimesterResolve from './route/trimester-routing-resolve.service';

const trimesterRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/trimester').then(m => m.Trimester),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/trimester-detail').then(m => m.TrimesterDetail),
    resolve: {
      trimester: TrimesterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/trimester-update').then(m => m.TrimesterUpdate),
    resolve: {
      trimester: TrimesterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/trimester-update').then(m => m.TrimesterUpdate),
    resolve: {
      trimester: TrimesterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default trimesterRoute;
