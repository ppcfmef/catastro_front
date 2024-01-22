import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuRouting} from './menu.routing';
import {MenuComponent} from './menu.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ListComponent} from './containers/list/list.component';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import { AddEditComponent } from './containers/add-edit/add-edit.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';


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
