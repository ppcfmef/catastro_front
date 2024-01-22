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
import { MaintenanceRoutingModule } from './maintenance-routing.module';

import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';

import { ListLandMaintenanceTableComponent } from './components/list-land-maintenance-table/list-land-maintenance-table.component';
import { ListLandMaintenanceContainerComponent } from './components/list-land-maintenance-container/list-land-maintenance-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BackListLandComponent } from './components/back-list-land/back-list-land.component';
import { LandMaintenanceTableComponent } from './components/land-maintenance-table/land-maintenance-table.component';
import { ListLandMaintenancePage } from './pages/list-land-maintenance/list-land-maintenance.page';
import { MaintenanceReassignmentContainerComponent } from './components/maintenance-reassignment-container/maintenance-reassignment-container.component';
import { MaintenanceAccumulationContainerComponent } from './components/maintenance-accumulation-container/maintenance-accumulation-container.component';
import { MaintenanceSplitContainerComponent } from './components/maintenance-split-container/maintenance-split-container.component';
import { SearchLandTableComponent } from './components/search-land-table/search-land-table.component';
import { SearchLandComponent } from './components/search-land/search-land.component';

import { MaintenanceAccumulationPage } from './pages/maintenance-accumulation/maintenance-accumulation.page';
import { MaintenanceReassignmentPage } from './pages/maintenance-reassignment/maintenance-reassignment.page';
import { MaintenanceSplitPage } from './pages/maintenance-split/maintenance-split.page';
import { LandMaintenanceFormComponent } from './components/land-maintenance-form/land-maintenance-form.component';
import { UploadSupportComponent } from './components/upload-support/upload-support.component';

import { ListApplicationMaintenanceTableComponent } from './components/list-application-maintenance-table/list-application-maintenance-table.component';

import { ListApplicationMaintenanceContainerComponent } from './components/list-application-maintenance-container/list-application-maintenance-container.component';

import { ListApplicationMaintenancePage } from './pages/list-application-maintenance/list-application-maintenance.page';
import { LandMaintenanceDesactivateComponent } from './components/land-maintenance-desactivate/land-maintenance-desactivate.component';
import { MaintenanceIndependencePage } from './pages/maintenance-independence/maintenance-independence.page';
import { MaintenanceIndependenceContainerComponent } from './components/maintenance-independence-container/maintenance-independence-container.component';


@NgModule({
  declarations: [

    MaintenanceAccumulationPage,
    MaintenanceReassignmentPage,
    MaintenanceSplitPage,
    ListLandMaintenanceTableComponent,
    ListLandMaintenanceContainerComponent,
    BackListLandComponent,
    LandMaintenanceTableComponent,
    ListLandMaintenancePage,
    MaintenanceReassignmentContainerComponent,
    MaintenanceAccumulationContainerComponent,
    MaintenanceSplitContainerComponent,
    SearchLandTableComponent,
    SearchLandComponent,
    LandMaintenanceFormComponent,
    UploadSupportComponent,

    ListApplicationMaintenanceTableComponent,

    ListApplicationMaintenanceContainerComponent,
      ListApplicationMaintenancePage,
      LandMaintenanceDesactivateComponent,
      MaintenanceIndependencePage,
      MaintenanceIndependenceContainerComponent,
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSortModule,
  ]
})
export class MaintenanceModule { }
