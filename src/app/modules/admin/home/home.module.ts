import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRouting} from './home.routing';
import {SharedModule} from '../../../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    declarations: [
        HomeComponent
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
