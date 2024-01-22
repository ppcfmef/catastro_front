import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolesRouting} from './roles.routing';
import { RolesComponent } from './roles.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ListComponent } from './containers/list/list.component';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import { AddEditComponent } from './containers/add-edit/add-edit.component';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {ReactiveFormsModule} from '@angular/forms';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';


@NgModule({
    declarations: [
    RolesComponent,
    ListComponent,
    AddEditComponent
  ],
    imports: [
        CommonModule,
        RolesRouting,
        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSelectModule
    ]
})
export class RolesModule {
}
