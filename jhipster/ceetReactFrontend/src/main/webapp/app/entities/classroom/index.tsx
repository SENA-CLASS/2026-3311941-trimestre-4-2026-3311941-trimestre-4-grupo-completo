import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Classroom from './classroom';
import ClassroomDeleteDialog from './classroom-delete-dialog';
import ClassroomDetail from './classroom-detail';
import ClassroomUpdate from './classroom-update';

const ClassroomRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Classroom />} />
    <Route path="new" element={<ClassroomUpdate />} />
    <Route path=":id">
      <Route index element={<ClassroomDetail />} />
      <Route path="edit" element={<ClassroomUpdate />} />
      <Route path="delete" element={<ClassroomDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ClassroomRoutes;
