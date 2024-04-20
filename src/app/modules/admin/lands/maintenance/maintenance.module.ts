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
import { MaintenanceRoutingModule } from './maintenance-routing.module';

import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
/*import {MatDatepickerModule} from '@angular/material/datepicker';*/
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule , MAT_DATE_LOCALE } from '@angular/material/core';
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
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } // Configura el idioma español
  ],
})
export class MaintenanceModule { }
