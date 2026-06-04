import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ClassroomTypeResolve from './route/classroom-type-routing-resolve.service';

const classroomTypeRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/classroom-type').then(m => m.ClassroomType),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/classroom-type-detail').then(m => m.ClassroomTypeDetail),
    resolve: {
      classroomType: ClassroomTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/classroom-type-update').then(m => m.ClassroomTypeUpdate),
    resolve: {
      classroomType: ClassroomTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/classroom-type-update').then(m => m.ClassroomTypeUpdate),
    resolve: {
      classroomType: ClassroomTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default classroomTypeRoute;
