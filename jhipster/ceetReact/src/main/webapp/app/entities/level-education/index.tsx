import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LevelEducation from './level-education';
import LevelEducationDeleteDialog from './level-education-delete-dialog';
import LevelEducationDetail from './level-education-detail';
import LevelEducationUpdate from './level-education-update';

const LevelEducationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LevelEducation />} />
    <Route path="new" element={<LevelEducationUpdate />} />
    <Route path=":id">
      <Route index element={<LevelEducationDetail />} />
      <Route path="edit" element={<LevelEducationUpdate />} />
      <Route path="delete" element={<LevelEducationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LevelEducationRoutes;
