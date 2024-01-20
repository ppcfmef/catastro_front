import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermissionsComponent} from './permissions.component';
import {PermissionsRouting} from './permissions.routing';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AssignmentsComponent } from './containers/assignments/assignments.component';
import {PermissionListComponent} from './components/permission-list/permission-list.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { ListComponent } from './containers/list/list.component';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';


@NgModule({
    declarations: [
        PermissionsComponent,
        AssignmentsComponent,
        PermissionListComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        PermissionsRouting,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        FormsModule,
        MatSidenavModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatInputModule,
        MatSlideToggleModule
    ]
})
export class PermissionsModule {
}
