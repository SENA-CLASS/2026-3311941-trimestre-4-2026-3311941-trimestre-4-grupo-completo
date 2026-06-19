import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DocumentType from './document-type';
import DocumentTypeDeleteDialog from './document-type-delete-dialog';
import DocumentTypeDetail from './document-type-detail';
import DocumentTypeUpdate from './document-type-update';
import { Authority } from 'app/shared/jhipster/constants';
import PrivateRoute from 'app/shared/auth/private-route';

const DocumentTypeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DocumentType />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.COORDINADOR]}>
          <DocumentTypeUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<DocumentTypeDetail />} />
      <Route path="edit" element={<DocumentTypeUpdate />} />
      <Route path="delete" element={<DocumentTypeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DocumentTypeRoutes;
