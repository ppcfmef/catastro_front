import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchByOwnerPage } from './pages/search-by-owner/search-by-owner.page';
import { SearchByLandPage } from './pages/search-by-land/search-by-land.page';
import { SearchSumaryPage } from './pages/search-sumary/search-sumary.page';
import { NewOwnerLandPage } from './pages/new-owner-land/new-owner-land.page';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';


const routes: Routes = [
  {
    path: 'search',
    component: SearchSumaryPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search-owner',
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'gprpregist', permissionType: 'read' },
      },
      {
        path: 'search-owner',
        component: SearchByOwnerPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'gprpregist', permissionType: 'read' },
      },
      {
        path: 'search-land',
        component: SearchByLandPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'gprpregist', permissionType: 'read' },
      },
    ]
  },
  {
    path: 'new-owner',
    component: NewOwnerLandPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'regnrewcon', permissionType: 'read' },
  },
  {
    path: 'edit-owner/:ownerId',
    component: NewOwnerLandPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'regnrewcon', permissionType: 'read' },
  },
  {
    path: 'edit-owner/:ownerId/land/:landId',
    component: NewOwnerLandPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'regnrewcon', permissionType: 'read' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandRegistryRoutingModule { }
