import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CheckListCourse from './check-list-course';
import CheckListCourseDeleteDialog from './check-list-course-delete-dialog';
import CheckListCourseDetail from './check-list-course-detail';
import CheckListCourseUpdate from './check-list-course-update';

const CheckListCourseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CheckListCourse />} />
    <Route path="new" element={<CheckListCourseUpdate />} />
    <Route path=":id">
      <Route index element={<CheckListCourseDetail />} />
      <Route path="edit" element={<CheckListCourseUpdate />} />
      <Route path="delete" element={<CheckListCourseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CheckListCourseRoutes;
