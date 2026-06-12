import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ClassroomType from './classroom-type';
import ClassroomTypeDeleteDialog from './classroom-type-delete-dialog';
import ClassroomTypeDetail from './classroom-type-detail';
import ClassroomTypeUpdate from './classroom-type-update';

const ClassroomTypeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ClassroomType />} />
    <Route path="new" element={<ClassroomTypeUpdate />} />
    <Route path=":id">
      <Route index element={<ClassroomTypeDetail />} />
      <Route path="edit" element={<ClassroomTypeUpdate />} />
      <Route path="delete" element={<ClassroomTypeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ClassroomTypeRoutes;
