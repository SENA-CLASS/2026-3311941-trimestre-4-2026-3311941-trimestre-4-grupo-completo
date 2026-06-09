import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import CheckListResolve from './route/check-list-routing-resolve.service';

const checkListRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/check-list').then(m => m.CheckList),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/check-list-detail').then(m => m.CheckListDetail),
    resolve: {
      checkList: CheckListResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/check-list-update').then(m => m.CheckListUpdate),
    resolve: {
      checkList: CheckListResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/check-list-update').then(m => m.CheckListUpdate),
    resolve: {
      checkList: CheckListResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default checkListRoute;
