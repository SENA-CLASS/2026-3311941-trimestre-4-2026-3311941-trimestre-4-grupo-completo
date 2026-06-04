import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ScheduleResolve from './route/schedule-routing-resolve.service';

const scheduleRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/schedule').then(m => m.Schedule),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/schedule-detail').then(m => m.ScheduleDetail),
    resolve: {
      schedule: ScheduleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/schedule-update').then(m => m.ScheduleUpdate),
    resolve: {
      schedule: ScheduleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/schedule-update').then(m => m.ScheduleUpdate),
    resolve: {
      schedule: ScheduleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default scheduleRoute;
