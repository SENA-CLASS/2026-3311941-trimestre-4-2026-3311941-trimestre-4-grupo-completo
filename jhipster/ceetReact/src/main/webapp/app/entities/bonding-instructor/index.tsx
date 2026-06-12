import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BondingInstructor from './bonding-instructor';
import BondingInstructorDeleteDialog from './bonding-instructor-delete-dialog';
import BondingInstructorDetail from './bonding-instructor-detail';
import BondingInstructorUpdate from './bonding-instructor-update';

const BondingInstructorRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BondingInstructor />} />
    <Route path="new" element={<BondingInstructorUpdate />} />
    <Route path=":id">
      <Route index element={<BondingInstructorDetail />} />
      <Route path="edit" element={<BondingInstructorUpdate />} />
      <Route path="delete" element={<BondingInstructorDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BondingInstructorRoutes;
