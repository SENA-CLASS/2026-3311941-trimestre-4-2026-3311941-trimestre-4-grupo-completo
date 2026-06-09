import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ObservationResponseResolve from './route/observation-response-routing-resolve.service';

const observationResponseRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/observation-response').then(m => m.ObservationResponse),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/observation-response-detail').then(m => m.ObservationResponseDetail),
    resolve: {
      observationResponse: ObservationResponseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/observation-response-update').then(m => m.ObservationResponseUpdate),
    resolve: {
      observationResponse: ObservationResponseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/observation-response-update').then(m => m.ObservationResponseUpdate),
    resolve: {
      observationResponse: ObservationResponseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default observationResponseRoute;
