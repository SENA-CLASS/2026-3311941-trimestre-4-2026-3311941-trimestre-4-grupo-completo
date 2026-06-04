import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import TrainingStatusResolve from './route/training-status-routing-resolve.service';

const trainingStatusRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/training-status').then(m => m.TrainingStatus),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/training-status-detail').then(m => m.TrainingStatusDetail),
    resolve: {
      trainingStatus: TrainingStatusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/training-status-update').then(m => m.TrainingStatusUpdate),
    resolve: {
      trainingStatus: TrainingStatusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/training-status-update').then(m => m.TrainingStatusUpdate),
    resolve: {
      trainingStatus: TrainingStatusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default trainingStatusRoute;
