import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AreaInstructor from './area-instructor';
import AreaInstructorDeleteDialog from './area-instructor-delete-dialog';
import AreaInstructorDetail from './area-instructor-detail';
import AreaInstructorUpdate from './area-instructor-update';

const AreaInstructorRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AreaInstructor />} />
    <Route path="new" element={<AreaInstructorUpdate />} />
    <Route path=":id">
      <Route index element={<AreaInstructorDetail />} />
      <Route path="edit" element={<AreaInstructorUpdate />} />
      <Route path="delete" element={<AreaInstructorDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AreaInstructorRoutes;
