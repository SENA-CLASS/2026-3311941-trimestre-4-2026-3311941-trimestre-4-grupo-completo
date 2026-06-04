import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ProjectPhaseResolve from './route/project-phase-routing-resolve.service';

const projectPhaseRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/project-phase').then(m => m.ProjectPhase),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/project-phase-detail').then(m => m.ProjectPhaseDetail),
    resolve: {
      projectPhase: ProjectPhaseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/project-phase-update').then(m => m.ProjectPhaseUpdate),
    resolve: {
      projectPhase: ProjectPhaseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/project-phase-update').then(m => m.ProjectPhaseUpdate),
    resolve: {
      projectPhase: ProjectPhaseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default projectPhaseRoute;
