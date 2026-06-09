import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import AreaInstructorResolve from './route/area-instructor-routing-resolve.service';

const areaInstructorRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/area-instructor').then(m => m.AreaInstructor),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/area-instructor-detail').then(m => m.AreaInstructorDetail),
    resolve: {
      areaInstructor: AreaInstructorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/area-instructor-update').then(m => m.AreaInstructorUpdate),
    resolve: {
      areaInstructor: AreaInstructorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/area-instructor-update').then(m => m.AreaInstructorUpdate),
    resolve: {
      areaInstructor: AreaInstructorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default areaInstructorRoute;
