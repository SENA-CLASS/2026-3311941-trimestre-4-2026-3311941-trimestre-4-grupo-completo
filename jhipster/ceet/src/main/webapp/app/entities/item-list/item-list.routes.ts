import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import ItemListResolve from './route/item-list-routing-resolve.service';

const itemListRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/item-list').then(m => m.ItemList),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/item-list-detail').then(m => m.ItemListDetail),
    resolve: {
      itemList: ItemListResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/item-list-update').then(m => m.ItemListUpdate),
    resolve: {
      itemList: ItemListResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/item-list-update').then(m => m.ItemListUpdate),
    resolve: {
      itemList: ItemListResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default itemListRoute;
