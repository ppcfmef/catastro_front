import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentOfLoadPage } from './pages/assignment-of-load/assignment-of-load.page';
import { AssignmentOfLoadRoutingModule } from './assignment-of-load-routing.module';
import { AssignmentOfLoadContainerComponent } from './components/assignment-of-load-container/assignment-of-load-container.component';
import { IndicatorWidgetComponent } from './components/indicator-widget/indicator-widget.component';
import { LoadListComponent } from './components/load-list/load-list.component';
import { MapComponent } from './components/map/map.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatDialogModule} from '@angular/material/dialog';
import { AssignmentOfLoadPendingComponent } from './components/assignment-of-load-pending/assignment-of-load-pending.component';
import { LoadPendingAssignmentComponent } from './components/load-pending-assignment/load-pending-assignment.component';
import { MatDialogDeletedComponent } from './components/alert-confirm/mat-dialog-deleted.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AssignmentOfLoadPage,
    AssignmentOfLoadContainerComponent,
    IndicatorWidgetComponent,
    LoadListComponent,
    MapComponent,
    TableComponent,
    AssignmentOfLoadPendingComponent,
    LoadPendingAssignmentComponent,
    MatDialogDeletedComponent
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
  ]
})
export class AssignmentOfLoadModule { }
