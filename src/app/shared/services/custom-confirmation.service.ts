import { Injectable } from '@angular/core';
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
}
