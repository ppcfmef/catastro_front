import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentOfLoadPage } from './pages/assignment-of-load/assignment-of-load.page';
import { AssignmentOfLoadRoutingModule } from './assignment-of-load-routing.module';
import { IndicatorWidgetComponent } from './components/indicator-widget/indicator-widget.component';
import { MapComponent } from '../shared/components/map/map.component';

import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { LoadPendingAssignmentComponent } from './containers/load-pending-assignment/load-pending-assignment.component';
import { LoadAssignedComponent } from './containers/load-assigned/load-assigned.component';
import { LoadAttendComponent } from './containers/load-attend/load-attend.component';
import { AssignLoadComponent } from './containers/assign-load/assign-load.component';
import { LoadListComponent } from './containers/load-list/load-list.component';
import { SharedModule } from '../shared/shared.module';
import { SharedModule as Shared } from 'app/shared/shared.module';

import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import { MatDialogDeletedComponent } from './components/alert-confirm/mat-dialog-deleted.component';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import { TableAssignedComponent } from './components/table-assigned/table-assigned.component';
import { NewLoadComponent } from './components/new-load/new-load.component';
import { DetailOperadorComponent } from './components/detail-operador/detail-operador.component';

import { ReactiveFormsModule } from '@angular/forms';
import { TablePendingComponent } from './components/table-pending/table-pending.component';
import { TableAttendedComponent } from './components/table-attended/table-attended.component';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';






@NgModule({
declarations: [
    AssignmentOfLoadPage,
    IndicatorWidgetComponent,
    MatDialogDeletedComponent,
    DetailOperadorComponent,
    AssignLoadComponent,
    LoadPendingAssignmentComponent,
    LoadAssignedComponent,
    LoadListComponent,
    LoadAttendComponent,
    TableAssignedComponent,
    NewLoadComponent,
    TablePendingComponent,
    TableAttendedComponent,
],
imports: [
    CommonModule,
    AssignmentOfLoadRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    Shared,
]
})
export class AssignmentOfLoadModule { }
