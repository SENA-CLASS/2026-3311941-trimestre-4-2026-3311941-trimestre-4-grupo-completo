import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import GroupResponseResolve from './route/group-response-routing-resolve.service';

const groupResponseRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/group-response').then(m => m.GroupResponse),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/group-response-detail').then(m => m.GroupResponseDetail),
    resolve: {
      groupResponse: GroupResponseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/group-response-update').then(m => m.GroupResponseUpdate),
    resolve: {
      groupResponse: GroupResponseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/group-response-update').then(m => m.GroupResponseUpdate),
    resolve: {
      groupResponse: GroupResponseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default groupResponseRoute;
