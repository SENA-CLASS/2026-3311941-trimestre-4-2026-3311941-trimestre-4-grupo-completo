import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Day from './day';
import DayDeleteDialog from './day-delete-dialog';
import DayDetail from './day-detail';
import DayUpdate from './day-update';

const DayRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Day />} />
    <Route path="new" element={<DayUpdate />} />
    <Route path=":id">
      <Route index element={<DayDetail />} />
      <Route path="edit" element={<DayUpdate />} />
      <Route path="delete" element={<DayDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DayRoutes;
