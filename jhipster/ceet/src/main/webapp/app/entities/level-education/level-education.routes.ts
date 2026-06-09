import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import LevelEducationResolve from './route/level-education-routing-resolve.service';

const levelEducationRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/level-education').then(m => m.LevelEducation),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/level-education-detail').then(m => m.LevelEducationDetail),
    resolve: {
      levelEducation: LevelEducationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/level-education-update').then(m => m.LevelEducationUpdate),
    resolve: {
      levelEducation: LevelEducationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/level-education-update').then(m => m.LevelEducationUpdate),
    resolve: {
      levelEducation: LevelEducationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default levelEducationRoute;
