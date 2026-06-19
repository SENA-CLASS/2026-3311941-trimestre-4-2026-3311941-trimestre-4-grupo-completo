import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CoursePlanning from './course-planning';
import CoursePlanningDeleteDialog from './course-planning-delete-dialog';
import CoursePlanningDetail from './course-planning-detail';
import CoursePlanningUpdate from './course-planning-update';

const CoursePlanningRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CoursePlanning />} />
    <Route path="new" element={<CoursePlanningUpdate />} />
    <Route path=":id">
      <Route index element={<CoursePlanningDetail />} />
      <Route path="edit" element={<CoursePlanningUpdate />} />
      <Route path="delete" element={<CoursePlanningDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CoursePlanningRoutes;
