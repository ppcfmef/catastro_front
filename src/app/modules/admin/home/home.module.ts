import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRouting} from './home.routing';
import {SharedModule} from '../../../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { DetailItemComponent } from './containers/detail-item/detail-item.component';
import { MenuItemsComponent } from './containers/menu-items/menu-items.component';


@NgModule({
    declarations: [
        HomeComponent,
        DetailItemComponent,
        MenuItemsComponent
    ],
    imports: [
        CommonModule,
        HomeRouting,
        SharedModule,
        MatSidenavModule,
        MatIconModule
    ]
})
export class HomeModule {
}
