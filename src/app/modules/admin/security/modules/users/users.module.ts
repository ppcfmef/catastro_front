import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRouting} from './users.routing';
import { UsersComponent } from './users.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ListComponent } from './containers/list/list.component';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import { AddEditComponent } from './containers/add-edit/add-edit.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
    declarations: [
    UsersComponent,
    ListComponent,
    AddEditComponent
  ],
    imports: [
        CommonModule,
        UsersRouting,
        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatRippleModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDatepickerModule
    ]
})
export class UsersModule {
}
