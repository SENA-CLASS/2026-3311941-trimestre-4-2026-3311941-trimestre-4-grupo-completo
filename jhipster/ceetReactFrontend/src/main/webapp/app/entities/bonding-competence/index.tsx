import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BondingCompetence from './bonding-competence';
import BondingCompetenceDeleteDialog from './bonding-competence-delete-dialog';
import BondingCompetenceDetail from './bonding-competence-detail';
import BondingCompetenceUpdate from './bonding-competence-update';

const BondingCompetenceRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BondingCompetence />} />
    <Route path="new" element={<BondingCompetenceUpdate />} />
    <Route path=":id">
      <Route index element={<BondingCompetenceDetail />} />
      <Route path="edit" element={<BondingCompetenceUpdate />} />
      <Route path="delete" element={<BondingCompetenceDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BondingCompetenceRoutes;
