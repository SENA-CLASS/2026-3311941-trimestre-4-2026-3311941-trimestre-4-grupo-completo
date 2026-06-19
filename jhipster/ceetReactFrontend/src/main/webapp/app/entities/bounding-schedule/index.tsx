import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BoundingSchedule from './bounding-schedule';
import BoundingScheduleDeleteDialog from './bounding-schedule-delete-dialog';
import BoundingScheduleDetail from './bounding-schedule-detail';
import BoundingScheduleUpdate from './bounding-schedule-update';

const BoundingScheduleRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BoundingSchedule />} />
    <Route path="new" element={<BoundingScheduleUpdate />} />
    <Route path=":id">
      <Route index element={<BoundingScheduleDetail />} />
      <Route path="edit" element={<BoundingScheduleUpdate />} />
      <Route path="delete" element={<BoundingScheduleDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BoundingScheduleRoutes;
