import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import QuarterScheduleResolve from './route/quarter-schedule-routing-resolve.service';

const quarterScheduleRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/quarter-schedule').then(m => m.QuarterSchedule),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/quarter-schedule-detail').then(m => m.QuarterScheduleDetail),
    resolve: {
      quarterSchedule: QuarterScheduleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/quarter-schedule-update').then(m => m.QuarterScheduleUpdate),
    resolve: {
      quarterSchedule: QuarterScheduleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/quarter-schedule-update').then(m => m.QuarterScheduleUpdate),
    resolve: {
      quarterSchedule: QuarterScheduleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quarterScheduleRoute;
