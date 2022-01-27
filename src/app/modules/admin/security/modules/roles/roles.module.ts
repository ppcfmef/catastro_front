import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolesRouting} from './roles.routing';
import { RolesComponent } from './roles.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ListComponent } from './containers/list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
    declarations: [
    RolesComponent,
    ListComponent
  ],
    imports: [
        CommonModule,
        RolesRouting,
        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule
    ]
})
export class RolesModule {
}
