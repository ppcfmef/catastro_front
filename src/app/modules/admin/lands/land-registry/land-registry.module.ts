import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { SharedModule as CustomSharedModule } from 'app/shared/shared.module';
import { MapsModule } from 'app/shared/maps/maps.module';

import { UploadhistoryService } from './services/uploadhistory.service';
import { LandRegistryRoutingModule } from './land-registry-routing.module';
import { UploadHistoryPage } from './pages/upload-history/upload-history.page';
import { UploadNewPage } from './pages/upload-new/upload-new.page';
import { UploadDetailPage } from './pages/upload-detail/upload-detail.page';
import { SearchByOwnerPage } from './pages/search-by-owner/search-by-owner.page';
import { SearchByLandPage } from './pages/search-by-land/search-by-land.page';
import { SearchSumaryPage } from './pages/search-sumary/search-sumary.page';
import { UploadhistoryListComponent } from './components/uploadhistory-list/uploadhistory-list.component';
import { SearchOwnerTableComponent } from './components/search-owner-table/search-owner-table.component';
import { SearchOwnerContainerComponent } from './components/search-owner-container/search-owner-container.component';
import { SearchLandTableComponent } from './components/search-land-table/search-land-table.component';
import { TableFilesComponent } from './pages/upload-new/components/table-files/table-files.component';
import { DetailPredioComponent } from './components/detail-predio/detail-predio.component';
import { SearchLandContainerComponent } from './components/search-land-container/search-land-container.component';
import { LandRegistryGeolocationComponent } from './components/land-registry-geolocation/land-registry-geolocation.component';

@NgModule({
  declarations: [
    UploadHistoryPage,
    UploadNewPage,
    UploadDetailPage,
    SearchByOwnerPage,
    SearchByLandPage,
    SearchSumaryPage,
    UploadhistoryListComponent,
    SearchOwnerTableComponent,
    SearchOwnerContainerComponent,
    SearchLandTableComponent,
    TableFilesComponent,
    SearchLandContainerComponent,
    DetailPredioComponent,
    LandRegistryGeolocationComponent,
  ],
  imports: [
    CommonModule,
    LandRegistryRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    CustomSharedModule,
    //LandRegistryGeolocationComponent,

    MapsModule,
  ],
  exports:[LandRegistryGeolocationComponent],
  providers: [
    UploadhistoryService,
  ]
})
export class LandRegistryModule { }
