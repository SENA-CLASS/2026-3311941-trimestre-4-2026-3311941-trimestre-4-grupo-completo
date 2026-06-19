import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Assessment from './assessment';
import AssessmentDeleteDialog from './assessment-delete-dialog';
import AssessmentDetail from './assessment-detail';
import AssessmentUpdate from './assessment-update';

const AssessmentRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Assessment />} />
    <Route path="new" element={<AssessmentUpdate />} />
    <Route path=":id">
      <Route index element={<AssessmentDetail />} />
      <Route path="edit" element={<AssessmentUpdate />} />
      <Route path="delete" element={<AssessmentDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AssessmentRoutes;
