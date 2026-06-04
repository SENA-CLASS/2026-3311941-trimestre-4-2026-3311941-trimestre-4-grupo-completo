import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ProjectActivityResolve from './route/project-activity-routing-resolve.service';

const projectActivityRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/project-activity').then(m => m.ProjectActivity),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/project-activity-detail').then(m => m.ProjectActivityDetail),
    resolve: {
      projectActivity: ProjectActivityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/project-activity-update').then(m => m.ProjectActivityUpdate),
    resolve: {
      projectActivity: ProjectActivityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/project-activity-update').then(m => m.ProjectActivityUpdate),
    resolve: {
      projectActivity: ProjectActivityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default projectActivityRoute;
