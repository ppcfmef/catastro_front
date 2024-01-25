import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './containers/list/list.component';
import { UserMonitoringRouting } from './user-monitoring.routing';
import { UserMonitoringComponent } from './user-monitoring.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DetailComponent } from './components/detail/detail.component';
import { HistoricalRecordDetailComponent } from './components/detail/historical-record-detail/historical-record-detail.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
    exports: [
        MatDialogModule
    ],
    declarations: [
        ListComponent,
        UserMonitoringComponent,
        DetailComponent,
        HistoricalRecordDetailComponent
    ],
    imports: [
        CommonModule,
        UserMonitoringRouting,
        MatIconModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatTableExporterModule
    ]
})
export class UserMonitoringModule { }
