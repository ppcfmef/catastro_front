import {Injectable} from '@angular/core';
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';
import {AlertConfirmComponent} from '../components/modals/alert-confirm/alert-confirm.component';
import {AlertSnackComponent} from '../components/modals/alert-snack/alert-snack.component';
import {AlertMessageComponent} from '../components/modals/alert-message/alert-message.component';
import {AlertSnackErrorComponent} from '../components/modals/alert-snack-error/alert-snack-error.component';
import {AlertSnackInfoComponent} from '../components/modals/alert-snack-info/alert-snack-info.component';

@Injectable({
    providedIn: 'root'
})
export class MessageProviderService {

    constructor(public dialog: MatDialog,
                public snackBar: MatSnackBar) {
    }

    showModal(component, config): any {
        return this.dialog.open(component, config);
    }

    showModalPromise(component, dialogData, width?, disableClose?): any {
        return this.dialog.open(component, {
            width: (width ? width : '800px'),
            disableClose: (disableClose ? disableClose : false), data: dialogData
        }).afterClosed().toPromise();
    }

    showConfirm(textmessage, isHtml = false): any {
        return this.dialog.open(AlertConfirmComponent, {
            width: '450px',

            data: {
                message: textmessage,
                isHtml
            },
            panelClass: ''
        });
    }

    showAlert(textmessage): any {
        return this.dialog.open(AlertMessageComponent, {
            width: 'auto',
            height: 'auto',
            data: {
                message: textmessage
            },
            panelClass: 'general-modal'
        });
    }

    showSnack(textmessage: string, error: boolean = false): any {
        this.snackBar.openFromComponent(AlertSnackComponent, {
            duration: 3000,
            verticalPosition: 'top',
            data: {
                message: textmessage
            },
            panelClass: 'snack-success'
        });
    }

    showSnackError(textmessage): any {
        this.snackBar.openFromComponent(AlertSnackErrorComponent, {
            duration: 3000,
            verticalPosition: 'top',
            data: {
                message: textmessage
            },
            panelClass: 'snack-error'
        });
    }

    showSnackInfo(textmessage): any {
        this.snackBar.openFromComponent(AlertSnackInfoComponent, {
            duration: 3000,
            verticalPosition: 'top',
            data: {
                message: textmessage
            },
            panelClass: 'snack-info'
        });
    }
}
