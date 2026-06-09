import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import PlanningActivityResolve from './route/planning-activity-routing-resolve.service';

const planningActivityRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/planning-activity').then(m => m.PlanningActivity),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/planning-activity-detail').then(m => m.PlanningActivityDetail),
    resolve: {
      planningActivity: PlanningActivityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/planning-activity-update').then(m => m.PlanningActivityUpdate),
    resolve: {
      planningActivity: PlanningActivityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/planning-activity-update').then(m => m.PlanningActivityUpdate),
    resolve: {
      planningActivity: PlanningActivityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default planningActivityRoute;
