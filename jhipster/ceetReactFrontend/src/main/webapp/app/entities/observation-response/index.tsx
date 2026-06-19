import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ObservationResponse from './observation-response';
import ObservationResponseDeleteDialog from './observation-response-delete-dialog';
import ObservationResponseDetail from './observation-response-detail';
import ObservationResponseUpdate from './observation-response-update';

const ObservationResponseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ObservationResponse />} />
    <Route path="new" element={<ObservationResponseUpdate />} />
    <Route path=":id">
      <Route index element={<ObservationResponseDetail />} />
      <Route path="edit" element={<ObservationResponseUpdate />} />
      <Route path="delete" element={<ObservationResponseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ObservationResponseRoutes;
