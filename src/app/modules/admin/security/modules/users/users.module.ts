import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRouting} from './users.routing';
import { UsersComponent } from './users.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ListComponent } from './containers/list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
    declarations: [
    UsersComponent,
    ListComponent
  ],
    imports: [
        CommonModule,
        UsersRouting,
        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule
    ]
})
export class UsersModule {
}
