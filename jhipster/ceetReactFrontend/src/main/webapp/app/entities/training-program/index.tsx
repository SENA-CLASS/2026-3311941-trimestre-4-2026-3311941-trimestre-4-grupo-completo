import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TrainingProgram from './training-program';
import TrainingProgramDeleteDialog from './training-program-delete-dialog';
import TrainingProgramDetail from './training-program-detail';
import TrainingProgramUpdate from './training-program-update';

const TrainingProgramRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TrainingProgram />} />
    <Route path="new" element={<TrainingProgramUpdate />} />
    <Route path=":id">
      <Route index element={<TrainingProgramDetail />} />
      <Route path="edit" element={<TrainingProgramUpdate />} />
      <Route path="delete" element={<TrainingProgramDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TrainingProgramRoutes;
