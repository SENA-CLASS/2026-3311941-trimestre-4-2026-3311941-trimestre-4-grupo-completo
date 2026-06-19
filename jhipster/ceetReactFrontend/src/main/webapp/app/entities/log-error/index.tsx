import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LogError from './log-error';
import LogErrorDeleteDialog from './log-error-delete-dialog';
import LogErrorDetail from './log-error-detail';
import LogErrorUpdate from './log-error-update';

const LogErrorRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LogError />} />
    <Route path="new" element={<LogErrorUpdate />} />
    <Route path=":id">
      <Route index element={<LogErrorDetail />} />
      <Route path="edit" element={<LogErrorUpdate />} />
      <Route path="delete" element={<LogErrorDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LogErrorRoutes;
