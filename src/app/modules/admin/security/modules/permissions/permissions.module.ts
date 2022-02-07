import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermissionsComponent} from './permissions.component';
import {PermissionsRouting} from './permissions.routing';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AssignmentsComponent } from './containers/assignments/assignments.component';
import {PermissionListComponent} from './components/permission-list/permission-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ListComponent } from './containers/list/list.component';
import {MatPaginatorModule} from "@angular/material/paginator";


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
        MatPaginatorModule
    ]
})
export class PermissionsModule {
}
