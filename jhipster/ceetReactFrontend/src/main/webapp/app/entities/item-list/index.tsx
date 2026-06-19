import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ItemList from './item-list';
import ItemListDeleteDialog from './item-list-delete-dialog';
import ItemListDetail from './item-list-detail';
import ItemListUpdate from './item-list-update';

const ItemListRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ItemList />} />
    <Route path="new" element={<ItemListUpdate />} />
    <Route path=":id">
      <Route index element={<ItemListDetail />} />
      <Route path="edit" element={<ItemListUpdate />} />
      <Route path="delete" element={<ItemListDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ItemListRoutes;
