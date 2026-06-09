import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import LogErrorResolve from './route/log-error-routing-resolve.service';

const logErrorRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/log-error').then(m => m.LogError),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/log-error-detail').then(m => m.LogErrorDetail),
    resolve: {
      logError: LogErrorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/log-error-update').then(m => m.LogErrorUpdate),
    resolve: {
      logError: LogErrorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/log-error-update').then(m => m.LogErrorUpdate),
    resolve: {
      logError: LogErrorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default logErrorRoute;
