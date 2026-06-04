import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ModalityResolve from './route/modality-routing-resolve.service';

const modalityRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/modality').then(m => m.Modality),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/modality-detail').then(m => m.ModalityDetail),
    resolve: {
      modality: ModalityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/modality-update').then(m => m.ModalityUpdate),
    resolve: {
      modality: ModalityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/modality-update').then(m => m.ModalityUpdate),
    resolve: {
      modality: ModalityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default modalityRoute;
