import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import CheckListCourseResolve from './route/check-list-course-routing-resolve.service';

const checkListCourseRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/check-list-course').then(m => m.CheckListCourse),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/check-list-course-detail').then(m => m.CheckListCourseDetail),
    resolve: {
      checkListCourse: CheckListCourseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/check-list-course-update').then(m => m.CheckListCourseUpdate),
    resolve: {
      checkListCourse: CheckListCourseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/check-list-course-update').then(m => m.CheckListCourseUpdate),
    resolve: {
      checkListCourse: CheckListCourseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default checkListCourseRoute;
