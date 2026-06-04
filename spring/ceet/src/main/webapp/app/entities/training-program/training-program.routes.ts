import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import TrainingProgramResolve from './route/training-program-routing-resolve.service';

const trainingProgramRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/training-program').then(m => m.TrainingProgram),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/training-program-detail').then(m => m.TrainingProgramDetail),
    resolve: {
      trainingProgram: TrainingProgramResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/training-program-update').then(m => m.TrainingProgramUpdate),
    resolve: {
      trainingProgram: TrainingProgramResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/training-program-update').then(m => m.TrainingProgramUpdate),
    resolve: {
      trainingProgram: TrainingProgramResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default trainingProgramRoute;
