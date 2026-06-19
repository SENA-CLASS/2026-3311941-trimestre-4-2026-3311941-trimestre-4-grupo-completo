import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CourseStatus from './course-status';
import CourseStatusDeleteDialog from './course-status-delete-dialog';
import CourseStatusDetail from './course-status-detail';
import CourseStatusUpdate from './course-status-update';

const CourseStatusRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CourseStatus />} />
    <Route path="new" element={<CourseStatusUpdate />} />
    <Route path=":id">
      <Route index element={<CourseStatusDetail />} />
      <Route path="edit" element={<CourseStatusUpdate />} />
      <Route path="delete" element={<CourseStatusDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CourseStatusRoutes;
