import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';

@Injectable({
  providedIn: 'root'
})
export class CustomConfirmationService {

  constructor(
    private confirmation: FuseConfirmationService
  ) { }

  success(title: string, message: string): void {
    this.confirmation.open({
      title: title,
      message: message,
      icon: {
        name: 'check_circle_outline',
        color: 'success',
      },
      actions: {
        confirm: {
          show: true,
          label: 'Aceptar',
          color: 'primary'
        },
        cancel: {
          show: false,
        }
      }
    });
  }

  error(title: string, message: string): MatDialogRef<FuseConfirmationDialogComponent> {
    return this.confirmation.open({
      title: title,
      message: message,
      icon: {
        name: 'heroicons_outline:exclamation',
        color: 'warn',
      },
      actions: {
        confirm: {
          show: true,
          label: 'Aceptar',
          color: 'primary'
        },
        cancel: {
          show: true,
          label:'Cancelar'
        }
      }
    });
  }
}
