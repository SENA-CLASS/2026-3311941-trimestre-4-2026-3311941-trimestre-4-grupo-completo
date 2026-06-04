import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import CourseStatusResolve from './route/course-status-routing-resolve.service';

const courseStatusRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/course-status').then(m => m.CourseStatus),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/course-status-detail').then(m => m.CourseStatusDetail),
    resolve: {
      courseStatus: CourseStatusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/course-status-update').then(m => m.CourseStatusUpdate),
    resolve: {
      courseStatus: CourseStatusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/course-status-update').then(m => m.CourseStatusUpdate),
    resolve: {
      courseStatus: CourseStatusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default courseStatusRoute;
