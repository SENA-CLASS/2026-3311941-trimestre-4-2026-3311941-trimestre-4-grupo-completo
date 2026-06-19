import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ProjectGroup from './project-group';
import ProjectGroupDeleteDialog from './project-group-delete-dialog';
import ProjectGroupDetail from './project-group-detail';
import ProjectGroupUpdate from './project-group-update';

const ProjectGroupRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ProjectGroup />} />
    <Route path="new" element={<ProjectGroupUpdate />} />
    <Route path=":id">
      <Route index element={<ProjectGroupDetail />} />
      <Route path="edit" element={<ProjectGroupUpdate />} />
      <Route path="delete" element={<ProjectGroupDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ProjectGroupRoutes;
