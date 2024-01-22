import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './containers/list/list.component';
import { UserMonitoringRouting } from './user-monitoring.routing';
import { UserMonitoringComponent } from './user-monitoring.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { DetailComponent } from './components/detail/detail.component';
import { HistoricalRecordDetailComponent } from './components/detail/historical-record-detail/historical-record-detail.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';


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
