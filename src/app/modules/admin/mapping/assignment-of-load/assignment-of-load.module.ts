import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentOfLoadPage } from './pages/assignment-of-load/assignment-of-load.page';
import { AssignmentOfLoadRoutingModule } from './assignment-of-load-routing.module';
import { IndicatorWidgetComponent } from './components/indicator-widget/indicator-widget.component';

import { MapComponent } from './components/map/map.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatDialogModule} from '@angular/material/dialog';
import { MatDialogDeletedComponent } from './components/alert-confirm/mat-dialog-deleted.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DetailOperadorComponent } from './containers/detail-operador/detail-operador.component';
import { WidgetComponent } from './components/widget/widget.component';


import { LoadPendingAssignmentComponent } from './containers/load-pending-assignment/load-pending-assignment.component';
import { LoadAssignedComponent } from './containers/load-assigned/load-assigned.component';

import { LoadAttendComponent } from './containers/load-attend/load-attend.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AssignLoadComponent } from './containers/assign-load/assign-load.component';
import { LoadListComponent } from './containers/load-list/load-list.component';



@NgModule({
declarations: [
    AssignmentOfLoadPage,
    IndicatorWidgetComponent,
    MapComponent,
    TableComponent,
    MatDialogDeletedComponent,
    DetailOperadorComponent,
    WidgetComponent,
    AssignLoadComponent,
    LoadPendingAssignmentComponent,
    LoadAssignedComponent,
    LoadListComponent,
    LoadAttendComponent,
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
]
})
export class AssignmentOfLoadModule { }
