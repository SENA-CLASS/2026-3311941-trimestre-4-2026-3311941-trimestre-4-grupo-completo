import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ClassroomResolve from './route/classroom-routing-resolve.service';

const classroomRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/classroom').then(m => m.Classroom),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/classroom-detail').then(m => m.ClassroomDetail),
    resolve: {
      classroom: ClassroomResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/classroom-update').then(m => m.ClassroomUpdate),
    resolve: {
      classroom: ClassroomResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/classroom-update').then(m => m.ClassroomUpdate),
    resolve: {
      classroom: ClassroomResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default classroomRoute;
