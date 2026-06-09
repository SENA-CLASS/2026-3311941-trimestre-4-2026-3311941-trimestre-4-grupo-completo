import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ScheduleVersionResolve from './route/schedule-version-routing-resolve.service';

const scheduleVersionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/schedule-version').then(m => m.ScheduleVersion),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/schedule-version-detail').then(m => m.ScheduleVersionDetail),
    resolve: {
      scheduleVersion: ScheduleVersionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/schedule-version-update').then(m => m.ScheduleVersionUpdate),
    resolve: {
      scheduleVersion: ScheduleVersionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/schedule-version-update').then(m => m.ScheduleVersionUpdate),
    resolve: {
      scheduleVersion: ScheduleVersionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default scheduleVersionRoute;
