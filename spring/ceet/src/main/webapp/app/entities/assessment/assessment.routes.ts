import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import AssessmentResolve from './route/assessment-routing-resolve.service';

const assessmentRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/assessment').then(m => m.Assessment),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/assessment-detail').then(m => m.AssessmentDetail),
    resolve: {
      assessment: AssessmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/assessment-update').then(m => m.AssessmentUpdate),
    resolve: {
      assessment: AssessmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/assessment-update').then(m => m.AssessmentUpdate),
    resolve: {
      assessment: AssessmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default assessmentRoute;
