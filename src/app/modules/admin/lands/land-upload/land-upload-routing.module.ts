import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadHistoryPage } from './pages/upload-history/upload-history.page';
import { UploadNewPage } from './pages/upload-new/upload-new.page';
import { UploadDetailPage } from './pages/upload-detail/upload-detail.page';

const routes: Routes = [
  {
    path: 'new',
    component: UploadNewPage,
  },
  {
    path: 'history',
    component: UploadHistoryPage
  },
  {
    path: 'history/:uploadRecordId',
    component: UploadDetailPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandUploadRoutingModule { }
