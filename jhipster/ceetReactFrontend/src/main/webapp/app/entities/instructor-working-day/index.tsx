import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import InstructorWorkingDay from './instructor-working-day';
import InstructorWorkingDayDeleteDialog from './instructor-working-day-delete-dialog';
import InstructorWorkingDayDetail from './instructor-working-day-detail';
import InstructorWorkingDayUpdate from './instructor-working-day-update';

const InstructorWorkingDayRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<InstructorWorkingDay />} />
    <Route path="new" element={<InstructorWorkingDayUpdate />} />
    <Route path=":id">
      <Route index element={<InstructorWorkingDayDetail />} />
      <Route path="edit" element={<InstructorWorkingDayUpdate />} />
      <Route path="delete" element={<InstructorWorkingDayDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default InstructorWorkingDayRoutes;
