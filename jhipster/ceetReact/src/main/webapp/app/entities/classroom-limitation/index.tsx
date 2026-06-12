import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ClassroomLimitation from './classroom-limitation';
import ClassroomLimitationDeleteDialog from './classroom-limitation-delete-dialog';
import ClassroomLimitationDetail from './classroom-limitation-detail';
import ClassroomLimitationUpdate from './classroom-limitation-update';

const ClassroomLimitationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ClassroomLimitation />} />
    <Route path="new" element={<ClassroomLimitationUpdate />} />
    <Route path=":id">
      <Route index element={<ClassroomLimitationDetail />} />
      <Route path="edit" element={<ClassroomLimitationUpdate />} />
      <Route path="delete" element={<ClassroomLimitationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ClassroomLimitationRoutes;
