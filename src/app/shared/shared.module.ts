import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardMenuItemComponent } from './components/card-menu-item/card-menu-item.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AlertConfirmComponent } from './components/modals/alert-confirm/alert-confirm.component';
import { AlertMessageComponent } from './components/modals/alert-message/alert-message.component';
import { AlertSnackComponent } from './components/modals/alert-snack/alert-snack.component';
import { AlertSnackErrorComponent } from './components/modals/alert-snack-error/alert-snack-error.component';
import { AlertSnackInfoComponent } from './components/modals/alert-snack-info/alert-snack-info.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule
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
    ],
    declarations: [
        AlertConfirmComponent,
        AlertMessageComponent,
        AlertSnackComponent,
        AlertSnackErrorComponent,
        AlertSnackInfoComponent,
      CardMenuItemComponent
    ]
})
export class SharedModule
{
}
