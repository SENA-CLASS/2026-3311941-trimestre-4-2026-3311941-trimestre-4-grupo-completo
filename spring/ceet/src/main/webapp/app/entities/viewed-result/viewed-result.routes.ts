import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ViewedResultResolve from './route/viewed-result-routing-resolve.service';

const viewedResultRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/viewed-result').then(m => m.ViewedResult),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/viewed-result-detail').then(m => m.ViewedResultDetail),
    resolve: {
      viewedResult: ViewedResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/viewed-result-update').then(m => m.ViewedResultUpdate),
    resolve: {
      viewedResult: ViewedResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/viewed-result-update').then(m => m.ViewedResultUpdate),
    resolve: {
      viewedResult: ViewedResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default viewedResultRoute;
