import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ClassroomLimitationResolve from './route/classroom-limitation-routing-resolve.service';

const classroomLimitationRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/classroom-limitation').then(m => m.ClassroomLimitation),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/classroom-limitation-detail').then(m => m.ClassroomLimitationDetail),
    resolve: {
      classroomLimitation: ClassroomLimitationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/classroom-limitation-update').then(m => m.ClassroomLimitationUpdate),
    resolve: {
      classroomLimitation: ClassroomLimitationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/classroom-limitation-update').then(m => m.ClassroomLimitationUpdate),
    resolve: {
      classroomLimitation: ClassroomLimitationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default classroomLimitationRoute;
