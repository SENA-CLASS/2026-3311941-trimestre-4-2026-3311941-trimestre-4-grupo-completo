import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PlanningActivity from './planning-activity';
import PlanningActivityDeleteDialog from './planning-activity-delete-dialog';
import PlanningActivityDetail from './planning-activity-detail';
import PlanningActivityUpdate from './planning-activity-update';

const PlanningActivityRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PlanningActivity />} />
    <Route path="new" element={<PlanningActivityUpdate />} />
    <Route path=":id">
      <Route index element={<PlanningActivityDetail />} />
      <Route path="edit" element={<PlanningActivityUpdate />} />
      <Route path="delete" element={<PlanningActivityDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PlanningActivityRoutes;
