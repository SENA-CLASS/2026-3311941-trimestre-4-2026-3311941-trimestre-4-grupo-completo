import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CurrentQuarter from './current-quarter';
import CurrentQuarterDeleteDialog from './current-quarter-delete-dialog';
import CurrentQuarterDetail from './current-quarter-detail';
import CurrentQuarterUpdate from './current-quarter-update';

const CurrentQuarterRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CurrentQuarter />} />
    <Route path="new" element={<CurrentQuarterUpdate />} />
    <Route path=":id">
      <Route index element={<CurrentQuarterDetail />} />
      <Route path="edit" element={<CurrentQuarterUpdate />} />
      <Route path="delete" element={<CurrentQuarterDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CurrentQuarterRoutes;
