import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UploadhistoryService } from './services/uploadhistory.service';
import { LandRegistryRoutingModule } from './land-registry-routing.module';
import { UploadHistoryPage } from './pages/upload-history/upload-history.page';
import { UploadNewPage } from './pages/upload-new/upload-new.page';
import { UploadDetailPage } from './pages/upload-detail/upload-detail.page';
import { SearchByOwnerPage } from './pages/search-by-owner/search-by-owner.page';
import { SearchByLandPage } from './pages/search-by-land/search-by-land.page';
import { SearchSumaryPage } from './pages/search-sumary/search-sumary.page';
import { UploadhistoryListComponent } from './components/uploadhistory-list/uploadhistory-list.component';


@NgModule({
  declarations: [
    UploadHistoryPage,
    UploadNewPage,
    UploadDetailPage,
    SearchByOwnerPage,
    SearchByLandPage,
    SearchSumaryPage,
    UploadhistoryListComponent
  ],
  imports: [
    CommonModule,
    LandRegistryRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    UploadhistoryService,
  ]
})
export class LandRegistryModule { }
