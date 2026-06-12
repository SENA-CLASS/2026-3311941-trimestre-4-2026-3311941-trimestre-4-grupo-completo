import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LearningResult from './learning-result';
import LearningResultDeleteDialog from './learning-result-delete-dialog';
import LearningResultDetail from './learning-result-detail';
import LearningResultUpdate from './learning-result-update';

const LearningResultRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LearningResult />} />
    <Route path="new" element={<LearningResultUpdate />} />
    <Route path=":id">
      <Route index element={<LearningResultDetail />} />
      <Route path="edit" element={<LearningResultUpdate />} />
      <Route path="delete" element={<LearningResultDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LearningResultRoutes;
