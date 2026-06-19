import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WorkingDayCourse from './working-day-course';
import WorkingDayCourseDeleteDialog from './working-day-course-delete-dialog';
import WorkingDayCourseDetail from './working-day-course-detail';
import WorkingDayCourseUpdate from './working-day-course-update';

const WorkingDayCourseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WorkingDayCourse />} />
    <Route path="new" element={<WorkingDayCourseUpdate />} />
    <Route path=":id">
      <Route index element={<WorkingDayCourseDetail />} />
      <Route path="edit" element={<WorkingDayCourseUpdate />} />
      <Route path="delete" element={<WorkingDayCourseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WorkingDayCourseRoutes;
