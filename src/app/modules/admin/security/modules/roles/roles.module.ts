import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolesRouting} from './roles.routing';
import { RolesComponent } from './roles.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ListComponent } from './containers/list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddEditComponent } from './containers/add-edit/add-edit.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';


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
