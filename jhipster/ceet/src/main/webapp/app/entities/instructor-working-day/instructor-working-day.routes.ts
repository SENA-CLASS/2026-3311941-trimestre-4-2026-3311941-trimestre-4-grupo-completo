import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import InstructorWorkingDayResolve from './route/instructor-working-day-routing-resolve.service';

const instructorWorkingDayRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/instructor-working-day').then(m => m.InstructorWorkingDay),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/instructor-working-day-detail').then(m => m.InstructorWorkingDayDetail),
    resolve: {
      instructorWorkingDay: InstructorWorkingDayResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/instructor-working-day-update').then(m => m.InstructorWorkingDayUpdate),
    resolve: {
      instructorWorkingDay: InstructorWorkingDayResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/instructor-working-day-update').then(m => m.InstructorWorkingDayUpdate),
    resolve: {
      instructorWorkingDay: InstructorWorkingDayResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default instructorWorkingDayRoute;
