import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

import { SharedModule as CustomSharedModule } from 'app/shared/shared.module';
import { MapsModule } from 'app/shared/maps/maps.module';

import { LandRegistryRoutingModule } from './land-registry-routing.module';
import { SearchByOwnerPage } from './pages/search-by-owner/search-by-owner.page';
import { SearchByLandPage } from './pages/search-by-land/search-by-land.page';
import { SearchSumaryPage } from './pages/search-sumary/search-sumary.page';
import { SearchOwnerTableComponent } from './components/search-owner-table/search-owner-table.component';
import { SearchOwnerContainerComponent } from './components/search-owner-container/search-owner-container.component';
import { SearchLandTableComponent } from './components/search-land-table/search-land-table.component';
import { DetailPredioComponent } from './components/detail-predio/detail-predio.component';
import { SearchLandContainerComponent } from './components/search-land-container/search-land-container.component';
import { NewOwnerLandPage } from './pages/new-owner-land/new-owner-land.page';
import { NewOwnerContainerComponent } from './components/new-owner-container/new-owner-container.component';
import { ListLandContainerComponent } from './components/list-land-container/list-land-container.component';
import { NewLandContainerComponent } from './components/new-land-container/new-land-container.component';
import { LandSummaryTableComponent } from './components/land-summary-table/land-summary-table.component';
import { OwnerLandDetailComponent } from './components/owner-land-detail/owner-land-detail.component';
import { OwnerLandCreateAndEditComponent } from './components/owner-land-create-and-edit/owner-land-create-and-edit.component';
import { LandCreateAndEditComponent } from './components/land-create-and-edit/land-create-and-edit.component';
import { LandDetailSummaryComponent } from './components/land-detail-summary/land-detail-summary.component';

import { LandRegistryGeolocationComponent } from './components/land-registry-geolocation/land-registry-geolocation.component';
import { SearchPlaceholderComponent } from './components/search-placeholder/search-placeholder.component';
import { MapPlaceholderComponent } from './components/map-placeholder/map-placeholder.component';

@NgModule({
  declarations: [
    SearchByOwnerPage,
    SearchByLandPage,
    SearchSumaryPage,
    SearchOwnerTableComponent,
    SearchOwnerContainerComponent,
    SearchLandTableComponent,
    SearchLandContainerComponent,
    DetailPredioComponent,
    NewOwnerLandPage,
    NewOwnerContainerComponent,
    ListLandContainerComponent,
    NewLandContainerComponent,
    LandSummaryTableComponent,
    OwnerLandDetailComponent,
    OwnerLandCreateAndEditComponent,
    LandCreateAndEditComponent,
    LandDetailSummaryComponent,
    LandRegistryGeolocationComponent,
    SearchPlaceholderComponent,
    MapPlaceholderComponent,
  ],
  imports: [
    CommonModule,
    LandRegistryRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule,
    CustomSharedModule,
    //LandRegistryGeolocationComponent,

    MapsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  exports:[LandRegistryGeolocationComponent],
  providers: []
})
export class LandRegistryModule { }
