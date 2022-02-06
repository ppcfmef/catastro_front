import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermissionsComponent} from './permissions.component';
import {PermissionsRouting} from './permissions.routing';


@NgModule({
    declarations: [
        PermissionsComponent
    ],
    imports: [
        CommonModule,
        PermissionsRouting
    ]
})
export class PermissionsModule {
}
