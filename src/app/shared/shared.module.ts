import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardMenuItemComponent } from './components/card-menu-item/card-menu-item.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseConfirmationModule } from '@fuse/services/confirmation/confirmation.module';

import { AlertConfirmComponent } from './components/modals/alert-confirm/alert-confirm.component';
import { AlertMessageComponent } from './components/modals/alert-message/alert-message.component';
import { AlertSnackComponent } from './components/modals/alert-snack/alert-snack.component';
import { AlertSnackErrorComponent } from './components/modals/alert-snack-error/alert-snack-error.component';
import { AlertSnackInfoComponent } from './components/modals/alert-snack-info/alert-snack-info.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GeoLocationComponent } from './components/geo-location/geo-location.component';
import { TabsComponent } from './components/tabs/tabs.component';

import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { SelectUbigeoComponent } from './components/select-ubigeo/select-ubigeo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FuseAlertModule } from '@fuse/components/alert';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTabsModule,
        MatSelectModule,
        FuseConfirmationModule,
        FuseAlertModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardMenuItemComponent,
        AlertConfirmComponent,
        AlertMessageComponent,
        AlertSnackComponent,
        AlertSnackErrorComponent,
        AlertSnackInfoComponent,
        GeoLocationComponent,
        TabsComponent,
        OnlyNumbersDirective,
        BreadCrumbsComponent,
        SelectUbigeoComponent,
    ],
    declarations: [
        AlertConfirmComponent,
        AlertMessageComponent,
        AlertSnackComponent,
        AlertSnackErrorComponent,
        AlertSnackInfoComponent,
        CardMenuItemComponent,
        GeoLocationComponent,
        TabsComponent,
        OnlyNumbersDirective,
        BreadCrumbsComponent,
        SelectUbigeoComponent,
    ]
})
export class SharedModule
{
}
