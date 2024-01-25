import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuRouting} from './menu.routing';
import {MenuComponent} from './menu.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ListComponent} from './containers/list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddEditComponent } from './containers/add-edit/add-edit.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    declarations: [
        MenuComponent,
        ListComponent,
        AddEditComponent
    ],
    imports: [
        CommonModule,
        MenuRouting,
        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ]
})
export class MenuModule {
}
