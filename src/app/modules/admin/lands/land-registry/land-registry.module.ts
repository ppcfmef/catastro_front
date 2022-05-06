import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandRegistryRoutingModule } from './land-registry-routing.module';
import { UploadHistoryPage } from './pages/upload-history/upload-history.page';
import { UploadNewPage } from './pages/upload-new/upload-new.page';
import { UploadDetailPage } from './pages/upload-detail/upload-detail.page';
import { SearchByOwnerPage } from './pages/search-by-owner/search-by-owner.page';
import { SearchByLandPage } from './pages/search-by-land/search-by-land.page';
import { SearchSumaryPage } from './pages/search-sumary/search-sumary.page';


@NgModule({
  declarations: [
    UploadHistoryPage,
    UploadNewPage,
    UploadDetailPage,
    SearchByOwnerPage,
    SearchByLandPage,
    SearchSumaryPage
  ],
  imports: [
    CommonModule,
    LandRegistryRoutingModule
  ]
})
export class LandRegistryModule { }
