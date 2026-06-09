import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import BondingCompetenceResolve from './route/bonding-competence-routing-resolve.service';

const bondingCompetenceRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/bonding-competence').then(m => m.BondingCompetence),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/bonding-competence-detail').then(m => m.BondingCompetenceDetail),
    resolve: {
      bondingCompetence: BondingCompetenceResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/bonding-competence-update').then(m => m.BondingCompetenceUpdate),
    resolve: {
      bondingCompetence: BondingCompetenceResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/bonding-competence-update').then(m => m.BondingCompetenceUpdate),
    resolve: {
      bondingCompetence: BondingCompetenceResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default bondingCompetenceRoute;
