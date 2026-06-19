import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import QuarterSchedule from './quarter-schedule';
import QuarterScheduleDeleteDialog from './quarter-schedule-delete-dialog';
import QuarterScheduleDetail from './quarter-schedule-detail';
import QuarterScheduleUpdate from './quarter-schedule-update';

const QuarterScheduleRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<QuarterSchedule />} />
    <Route path="new" element={<QuarterScheduleUpdate />} />
    <Route path=":id">
      <Route index element={<QuarterScheduleDetail />} />
      <Route path="edit" element={<QuarterScheduleUpdate />} />
      <Route path="delete" element={<QuarterScheduleDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default QuarterScheduleRoutes;
