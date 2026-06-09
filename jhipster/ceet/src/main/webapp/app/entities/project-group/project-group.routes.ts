import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ProjectGroupResolve from './route/project-group-routing-resolve.service';

const projectGroupRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/project-group').then(m => m.ProjectGroup),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/project-group-detail').then(m => m.ProjectGroupDetail),
    resolve: {
      projectGroup: ProjectGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/project-group-update').then(m => m.ProjectGroupUpdate),
    resolve: {
      projectGroup: ProjectGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/project-group-update').then(m => m.ProjectGroupUpdate),
    resolve: {
      projectGroup: ProjectGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default projectGroupRoute;
