import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ProjectActivity from './project-activity';
import ProjectActivityDeleteDialog from './project-activity-delete-dialog';
import ProjectActivityDetail from './project-activity-detail';
import ProjectActivityUpdate from './project-activity-update';

const ProjectActivityRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ProjectActivity />} />
    <Route path="new" element={<ProjectActivityUpdate />} />
    <Route path=":id">
      <Route index element={<ProjectActivityDetail />} />
      <Route path="edit" element={<ProjectActivityUpdate />} />
      <Route path="delete" element={<ProjectActivityDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ProjectActivityRoutes;
