import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import PlanningResolve from './route/planning-routing-resolve.service';

const planningRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/planning').then(m => m.Planning),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/planning-detail').then(m => m.PlanningDetail),
    resolve: {
      planning: PlanningResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/planning-update').then(m => m.PlanningUpdate),
    resolve: {
      planning: PlanningResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/planning-update').then(m => m.PlanningUpdate),
    resolve: {
      planning: PlanningResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default planningRoute;
