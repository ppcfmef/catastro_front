import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadHistoryPage } from './pages/upload-history/upload-history.page';
import { UploadNewPage } from './pages/upload-new/upload-new.page';
import { UploadDetailPage } from './pages/upload-detail/upload-detail.page';
import { SearchByOwnerPage } from './pages/search-by-owner/search-by-owner.page';
import { SearchByLandPage } from './pages/search-by-land/search-by-land.page';
import { SearchSumaryPage } from './pages/search-sumary/search-sumary.page';

const routes: Routes = [
  {
    path: 'history',
    component: UploadHistoryPage
  },
  {
    path: 'history/:uploadRecordId',
    component: UploadDetailPage
  },
  {
    path: 'upload',
    component: UploadNewPage
  },
  {
    path: 'search-owner',
    component: SearchByOwnerPage
  },
  {
    path: 'search-land',
    component: SearchByLandPage
  },
  {
    path: 'search-sumary',
    component: SearchSumaryPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandRegistryRoutingModule { }
