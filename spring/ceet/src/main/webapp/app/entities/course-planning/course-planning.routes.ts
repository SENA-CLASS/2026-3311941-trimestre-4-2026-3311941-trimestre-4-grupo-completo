import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import CoursePlanningResolve from './route/course-planning-routing-resolve.service';

const coursePlanningRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/course-planning').then(m => m.CoursePlanning),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/course-planning-detail').then(m => m.CoursePlanningDetail),
    resolve: {
      coursePlanning: CoursePlanningResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/course-planning-update').then(m => m.CoursePlanningUpdate),
    resolve: {
      coursePlanning: CoursePlanningResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/course-planning-update').then(m => m.CoursePlanningUpdate),
    resolve: {
      coursePlanning: CoursePlanningResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default coursePlanningRoute;
