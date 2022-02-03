import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRouting} from './users.routing';
import { UsersComponent } from './users.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ListComponent } from './containers/list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddEditComponent } from './containers/add-edit/add-edit.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';


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
        MatRippleModule
    ]
})
export class UsersModule {
}
