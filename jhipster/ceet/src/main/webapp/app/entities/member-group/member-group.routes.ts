import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import MemberGroupResolve from './route/member-group-routing-resolve.service';

const memberGroupRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/member-group').then(m => m.MemberGroup),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/member-group-detail').then(m => m.MemberGroupDetail),
    resolve: {
      memberGroup: MemberGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/member-group-update').then(m => m.MemberGroupUpdate),
    resolve: {
      memberGroup: MemberGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/member-group-update').then(m => m.MemberGroupUpdate),
    resolve: {
      memberGroup: MemberGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default memberGroupRoute;
