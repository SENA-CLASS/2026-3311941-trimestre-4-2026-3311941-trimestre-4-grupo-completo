import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Year from './year';
import YearDeleteDialog from './year-delete-dialog';
import YearDetail from './year-detail';
import YearUpdate from './year-update';

const YearRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Year />} />
    <Route path="new" element={<YearUpdate />} />
    <Route path=":id">
      <Route index element={<YearDetail />} />
      <Route path="edit" element={<YearUpdate />} />
      <Route path="delete" element={<YearDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default YearRoutes;
