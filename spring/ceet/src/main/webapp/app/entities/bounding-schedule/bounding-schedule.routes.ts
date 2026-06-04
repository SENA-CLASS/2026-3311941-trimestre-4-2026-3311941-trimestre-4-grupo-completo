import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import BoundingScheduleResolve from './route/bounding-schedule-routing-resolve.service';

const boundingScheduleRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/bounding-schedule').then(m => m.BoundingSchedule),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/bounding-schedule-detail').then(m => m.BoundingScheduleDetail),
    resolve: {
      boundingSchedule: BoundingScheduleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/bounding-schedule-update').then(m => m.BoundingScheduleUpdate),
    resolve: {
      boundingSchedule: BoundingScheduleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/bounding-schedule-update').then(m => m.BoundingScheduleUpdate),
    resolve: {
      boundingSchedule: BoundingScheduleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default boundingScheduleRoute;
