import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ProjectPhase from './project-phase';
import ProjectPhaseDeleteDialog from './project-phase-delete-dialog';
import ProjectPhaseDetail from './project-phase-detail';
import ProjectPhaseUpdate from './project-phase-update';

const ProjectPhaseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ProjectPhase />} />
    <Route path="new" element={<ProjectPhaseUpdate />} />
    <Route path=":id">
      <Route index element={<ProjectPhaseDetail />} />
      <Route path="edit" element={<ProjectPhaseUpdate />} />
      <Route path="delete" element={<ProjectPhaseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ProjectPhaseRoutes;
