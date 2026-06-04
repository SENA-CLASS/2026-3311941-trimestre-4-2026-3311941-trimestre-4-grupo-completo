import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import LogAuditResolve from './route/log-audit-routing-resolve.service';

const logAuditRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/log-audit').then(m => m.LogAudit),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/log-audit-detail').then(m => m.LogAuditDetail),
    resolve: {
      logAudit: LogAuditResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/log-audit-update').then(m => m.LogAuditUpdate),
    resolve: {
      logAudit: LogAuditResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/log-audit-update').then(m => m.LogAuditUpdate),
    resolve: {
      logAudit: LogAuditResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default logAuditRoute;
