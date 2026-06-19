import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WorkingDay from './working-day';
import WorkingDayDeleteDialog from './working-day-delete-dialog';
import WorkingDayDetail from './working-day-detail';
import WorkingDayUpdate from './working-day-update';

const WorkingDayRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WorkingDay />} />
    <Route path="new" element={<WorkingDayUpdate />} />
    <Route path=":id">
      <Route index element={<WorkingDayDetail />} />
      <Route path="edit" element={<WorkingDayUpdate />} />
      <Route path="delete" element={<WorkingDayDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WorkingDayRoutes;
