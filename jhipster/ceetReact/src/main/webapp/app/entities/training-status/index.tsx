import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TrainingStatus from './training-status';
import TrainingStatusDeleteDialog from './training-status-delete-dialog';
import TrainingStatusDetail from './training-status-detail';
import TrainingStatusUpdate from './training-status-update';

const TrainingStatusRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TrainingStatus />} />
    <Route path="new" element={<TrainingStatusUpdate />} />
    <Route path=":id">
      <Route index element={<TrainingStatusDetail />} />
      <Route path="edit" element={<TrainingStatusUpdate />} />
      <Route path="delete" element={<TrainingStatusDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TrainingStatusRoutes;
