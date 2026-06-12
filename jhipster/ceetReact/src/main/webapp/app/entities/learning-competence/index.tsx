import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LearningCompetence from './learning-competence';
import LearningCompetenceDeleteDialog from './learning-competence-delete-dialog';
import LearningCompetenceDetail from './learning-competence-detail';
import LearningCompetenceUpdate from './learning-competence-update';

const LearningCompetenceRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LearningCompetence />} />
    <Route path="new" element={<LearningCompetenceUpdate />} />
    <Route path=":id">
      <Route index element={<LearningCompetenceDetail />} />
      <Route path="edit" element={<LearningCompetenceUpdate />} />
      <Route path="delete" element={<LearningCompetenceDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LearningCompetenceRoutes;
