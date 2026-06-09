import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import LearningResultResolve from './route/learning-result-routing-resolve.service';

const learningResultRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/learning-result').then(m => m.LearningResult),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/learning-result-detail').then(m => m.LearningResultDetail),
    resolve: {
      learningResult: LearningResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/learning-result-update').then(m => m.LearningResultUpdate),
    resolve: {
      learningResult: LearningResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/learning-result-update').then(m => m.LearningResultUpdate),
    resolve: {
      learningResult: LearningResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default learningResultRoute;
