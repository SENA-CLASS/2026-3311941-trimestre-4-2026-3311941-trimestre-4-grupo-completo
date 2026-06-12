import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Bonding from './bonding';
import BondingDeleteDialog from './bonding-delete-dialog';
import BondingDetail from './bonding-detail';
import BondingUpdate from './bonding-update';

const BondingRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Bonding />} />
    <Route path="new" element={<BondingUpdate />} />
    <Route path=":id">
      <Route index element={<BondingDetail />} />
      <Route path="edit" element={<BondingUpdate />} />
      <Route path="delete" element={<BondingDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BondingRoutes;
