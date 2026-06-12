import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Planning from './planning';
import PlanningDeleteDialog from './planning-delete-dialog';
import PlanningDetail from './planning-detail';
import PlanningUpdate from './planning-update';

const PlanningRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Planning />} />
    <Route path="new" element={<PlanningUpdate />} />
    <Route path=":id">
      <Route index element={<PlanningDetail />} />
      <Route path="edit" element={<PlanningUpdate />} />
      <Route path="delete" element={<PlanningDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PlanningRoutes;
