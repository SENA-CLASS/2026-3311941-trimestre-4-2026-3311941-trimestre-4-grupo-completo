import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import LearningCompetenceResolve from './route/learning-competence-routing-resolve.service';

const learningCompetenceRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/learning-competence').then(m => m.LearningCompetence),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/learning-competence-detail').then(m => m.LearningCompetenceDetail),
    resolve: {
      learningCompetence: LearningCompetenceResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/learning-competence-update').then(m => m.LearningCompetenceUpdate),
    resolve: {
      learningCompetence: LearningCompetenceResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/learning-competence-update').then(m => m.LearningCompetenceUpdate),
    resolve: {
      learningCompetence: LearningCompetenceResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default learningCompetenceRoute;
