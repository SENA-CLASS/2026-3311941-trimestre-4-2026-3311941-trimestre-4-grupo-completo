import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CourseTrimester from './course-trimester';
import CourseTrimesterDeleteDialog from './course-trimester-delete-dialog';
import CourseTrimesterDetail from './course-trimester-detail';
import CourseTrimesterUpdate from './course-trimester-update';

const CourseTrimesterRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CourseTrimester />} />
    <Route path="new" element={<CourseTrimesterUpdate />} />
    <Route path=":id">
      <Route index element={<CourseTrimesterDetail />} />
      <Route path="edit" element={<CourseTrimesterUpdate />} />
      <Route path="delete" element={<CourseTrimesterDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CourseTrimesterRoutes;
