import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import GroupResponse from './group-response';
import GroupResponseDeleteDialog from './group-response-delete-dialog';
import GroupResponseDetail from './group-response-detail';
import GroupResponseUpdate from './group-response-update';

const GroupResponseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<GroupResponse />} />
    <Route path="new" element={<GroupResponseUpdate />} />
    <Route path=":id">
      <Route index element={<GroupResponseDetail />} />
      <Route path="edit" element={<GroupResponseUpdate />} />
      <Route path="delete" element={<GroupResponseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default GroupResponseRoutes;
