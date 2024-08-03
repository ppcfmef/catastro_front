import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
import { AlertLandOwnerComponent } from './components/alert-land-owner/alert-land-owner.component';
import { SearchMapComponent } from './components/search-map/searchMap.component';
import { SearchModule } from 'app/layout/common/search/search.module';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { DetailPredioByOwnerComponent } from './components/detail-predio-by-owner/detail-predio-by-owner.component';

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
    AlertLandOwnerComponent,
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
    SearchMapComponent,
    SearchModule,
    FuseScrollbarModule,
    DetailPredioByOwnerComponent
  ],
  exports:[LandRegistryGeolocationComponent],
  providers: []
})
export class LandRegistryModule { }
