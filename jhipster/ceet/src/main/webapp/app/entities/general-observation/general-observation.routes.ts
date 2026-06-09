import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import GeneralObservationResolve from './route/general-observation-routing-resolve.service';

const generalObservationRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/general-observation').then(m => m.GeneralObservation),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/general-observation-detail').then(m => m.GeneralObservationDetail),
    resolve: {
      generalObservation: GeneralObservationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/general-observation-update').then(m => m.GeneralObservationUpdate),
    resolve: {
      generalObservation: GeneralObservationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/general-observation-update').then(m => m.GeneralObservationUpdate),
    resolve: {
      generalObservation: GeneralObservationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default generalObservationRoute;
