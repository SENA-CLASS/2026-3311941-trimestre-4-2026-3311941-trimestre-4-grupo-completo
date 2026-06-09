import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import CourseTrimesterResolve from './route/course-trimester-routing-resolve.service';

const courseTrimesterRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/course-trimester').then(m => m.CourseTrimester),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/course-trimester-detail').then(m => m.CourseTrimesterDetail),
    resolve: {
      courseTrimester: CourseTrimesterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/course-trimester-update').then(m => m.CourseTrimesterUpdate),
    resolve: {
      courseTrimester: CourseTrimesterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/course-trimester-update').then(m => m.CourseTrimesterUpdate),
    resolve: {
      courseTrimester: CourseTrimesterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default courseTrimesterRoute;
