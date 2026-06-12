import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import GeneralObservation from './general-observation';
import GeneralObservationDeleteDialog from './general-observation-delete-dialog';
import GeneralObservationDetail from './general-observation-detail';
import GeneralObservationUpdate from './general-observation-update';

const GeneralObservationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<GeneralObservation />} />
    <Route path="new" element={<GeneralObservationUpdate />} />
    <Route path=":id">
      <Route index element={<GeneralObservationDetail />} />
      <Route path="edit" element={<GeneralObservationUpdate />} />
      <Route path="delete" element={<GeneralObservationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default GeneralObservationRoutes;
