import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ViewedResult from './viewed-result';
import ViewedResultDeleteDialog from './viewed-result-delete-dialog';
import ViewedResultDetail from './viewed-result-detail';
import ViewedResultUpdate from './viewed-result-update';

const ViewedResultRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ViewedResult />} />
    <Route path="new" element={<ViewedResultUpdate />} />
    <Route path=":id">
      <Route index element={<ViewedResultDetail />} />
      <Route path="edit" element={<ViewedResultUpdate />} />
      <Route path="delete" element={<ViewedResultDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ViewedResultRoutes;
