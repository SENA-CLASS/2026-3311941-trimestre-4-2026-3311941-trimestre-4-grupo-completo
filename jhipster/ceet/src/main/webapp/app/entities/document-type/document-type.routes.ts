import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import DocumentTypeResolve from './route/document-type-routing-resolve.service';

const documentTypeRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/document-type').then(m => m.DocumentType),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/document-type-detail').then(m => m.DocumentTypeDetail),
    resolve: {
      documentType: DocumentTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/document-type-update').then(m => m.DocumentTypeUpdate),
    resolve: {
      documentType: DocumentTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/document-type-update').then(m => m.DocumentTypeUpdate),
    resolve: {
      documentType: DocumentTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default documentTypeRoute;
