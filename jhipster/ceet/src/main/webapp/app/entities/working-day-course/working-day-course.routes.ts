import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import WorkingDayCourseResolve from './route/working-day-course-routing-resolve.service';

const workingDayCourseRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/working-day-course').then(m => m.WorkingDayCourse),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/working-day-course-detail').then(m => m.WorkingDayCourseDetail),
    resolve: {
      workingDayCourse: WorkingDayCourseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/working-day-course-update').then(m => m.WorkingDayCourseUpdate),
    resolve: {
      workingDayCourse: WorkingDayCourseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/working-day-course-update').then(m => m.WorkingDayCourseUpdate),
    resolve: {
      workingDayCourse: WorkingDayCourseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default workingDayCourseRoute;
