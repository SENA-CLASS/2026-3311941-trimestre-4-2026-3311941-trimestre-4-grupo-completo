import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import BondingInstructorResolve from './route/bonding-instructor-routing-resolve.service';

const bondingInstructorRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/bonding-instructor').then(m => m.BondingInstructor),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/bonding-instructor-detail').then(m => m.BondingInstructorDetail),
    resolve: {
      bondingInstructor: BondingInstructorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/bonding-instructor-update').then(m => m.BondingInstructorUpdate),
    resolve: {
      bondingInstructor: BondingInstructorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/bonding-instructor-update').then(m => m.BondingInstructorUpdate),
    resolve: {
      bondingInstructor: BondingInstructorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default bondingInstructorRoute;
