import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import CampusResolve from './route/campus-routing-resolve.service';

const campusRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/campus').then(m => m.Campus),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/campus-detail').then(m => m.CampusDetail),
    resolve: {
      campus: CampusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/campus-update').then(m => m.CampusUpdate),
    resolve: {
      campus: CampusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/campus-update').then(m => m.CampusUpdate),
    resolve: {
      campus: CampusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default campusRoute;
