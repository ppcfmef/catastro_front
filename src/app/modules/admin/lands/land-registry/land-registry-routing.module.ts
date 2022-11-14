import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchByOwnerPage } from './pages/search-by-owner/search-by-owner.page';
import { SearchByLandPage } from './pages/search-by-land/search-by-land.page';
import { SearchSumaryPage } from './pages/search-sumary/search-sumary.page';
import { NewOwnerLandPage } from './pages/new-owner-land/new-owner-land.page';

const routes: Routes = [
  {
    path: 'search',
    component: SearchSumaryPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search-owner',
      },
      {
        path: 'search-owner',
        component: SearchByOwnerPage
      },
      {
        path: 'search-land',
        component: SearchByLandPage
      },
    ]
  },
  {
    path: 'new-owner',
    component: NewOwnerLandPage
  },
  {
    path: 'edit-owner/:ownerId',
    component: NewOwnerLandPage
  },
  {
    path: 'edit-owner/:ownerId/land/:landId',
    component: NewOwnerLandPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandRegistryRoutingModule { }
