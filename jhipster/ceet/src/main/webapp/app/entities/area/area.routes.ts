import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import AreaResolve from './route/area-routing-resolve.service';

const areaRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/area').then(m => m.Area),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/area-detail').then(m => m.AreaDetail),
    resolve: {
      area: AreaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/area-update').then(m => m.AreaUpdate),
    resolve: {
      area: AreaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/area-update').then(m => m.AreaUpdate),
    resolve: {
      area: AreaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default areaRoute;
