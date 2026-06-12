import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ScheduleVersion from './schedule-version';
import ScheduleVersionDeleteDialog from './schedule-version-delete-dialog';
import ScheduleVersionDetail from './schedule-version-detail';
import ScheduleVersionUpdate from './schedule-version-update';

const ScheduleVersionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ScheduleVersion />} />
    <Route path="new" element={<ScheduleVersionUpdate />} />
    <Route path=":id">
      <Route index element={<ScheduleVersionDetail />} />
      <Route path="edit" element={<ScheduleVersionUpdate />} />
      <Route path="delete" element={<ScheduleVersionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ScheduleVersionRoutes;
