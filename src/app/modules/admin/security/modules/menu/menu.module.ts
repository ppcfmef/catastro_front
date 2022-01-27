import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuRouting} from './menu.routing';
import {MenuComponent} from './menu.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ListComponent} from './containers/list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
    declarations: [
        MenuComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        MenuRouting,
        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule
    ]
})
export class MenuModule {
}
