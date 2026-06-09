import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import WorkingDayResolve from './route/working-day-routing-resolve.service';

const workingDayRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/working-day').then(m => m.WorkingDay),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/working-day-detail').then(m => m.WorkingDayDetail),
    resolve: {
      workingDay: WorkingDayResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/working-day-update').then(m => m.WorkingDayUpdate),
    resolve: {
      workingDay: WorkingDayResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/working-day-update').then(m => m.WorkingDayUpdate),
    resolve: {
      workingDay: WorkingDayResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default workingDayRoute;
