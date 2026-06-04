import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import BondingResolve from './route/bonding-routing-resolve.service';

const bondingRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/bonding').then(m => m.Bonding),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/bonding-detail').then(m => m.BondingDetail),
    resolve: {
      bonding: BondingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/bonding-update').then(m => m.BondingUpdate),
    resolve: {
      bonding: BondingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/bonding-update').then(m => m.BondingUpdate),
    resolve: {
      bonding: BondingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default bondingRoute;
