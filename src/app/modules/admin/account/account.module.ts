import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileModule} from './profile/profile.module';
import {AccountRouting} from './account.routing';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AccountRouting
    ]
})
export class AccountModule {
}
