import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormUtils} from '../../../../../../shared/utils/form.utils';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import {MessageProviderService} from '../../../../../../shared/services/message-provider.service';
import { Router } from '@angular/router';
import { UploadhistoryService } from '../../services/uploadhistory.service';

@Component({
  selector: 'app-upload-container',
  templateUrl: './upload-container.component.html',
  styleUrls: ['./upload-container.component.scss']
})
export class UploadContainerComponent implements OnInit {
  @ViewChild('uploadfile') uploadfileElement: ElementRef;
  uploadId: number;
  uploadForm = new FormGroup({
    fileUpload: new FormControl(null, [Validators.required]),
  });

  recordSumary: any;

  fileName: string;

  constructor(
      private _router: Router,
      private _ngxSpinner: NgxSpinnerService,
      private _messageProviderService: MessageProviderService,
      private uploadService: UploadhistoryService,
      private confirmationService: CustomConfirmationService,
  ) {
  }

  ngOnInit(): void {
  }


  get fileUpload(): FormControl {
      return this.uploadForm.get('fileUpload') as FormControl;
  }

  async parseFormFile(): Promise<void> {
      if (this.uploadForm.valid && this.uploadForm.dirty) {
          const rawValue = this.uploadForm.getRawValue();
          const payload = FormUtils.parseToFormData(rawValue);
          await this.uploadFormFile(payload);
      } else {
          this.uploadForm.markAsTouched();
      }
  }

  async uploadFormFile(payload: FormData): Promise<void> {
      try {
          this._ngxSpinner.show();
          this.uploadService.uploadFile(payload)
          .subscribe(
              (res) => {
                  this.recordSumary = res;
                this._messageProviderService.showSnack('Cargado correctamente');
              },
              (err) => {
                this._messageProviderService.showSnackError('Error al cargar el archivo');
                this.resetControls();
              },
              () => {
                this.resetControls();
              }
          );
      } catch (err) {
          this.resetControls();
          this._messageProviderService.showSnackError('Error al cargar el archivo');
          throw new Error('Err:' + err.error.statusText);
      }
  }

  uploadFile(event): void {
      const fileToUpload = event.target.files.item(0);
      this.fileName = event.target.value;
      this.fileName = this.fileName.split(/(\\|\/)/g).pop();
      this.fileName = this.fileName.toString();

      if (fileToUpload) {
          this.fileUpload.setValue(fileToUpload);
          this.fileUpload.markAsDirty();
      }
  }

  recepcionarValidos(): void{
      this._ngxSpinner.show();
  }


  onCancelUpload(): void {
    this.changeUploadStatus('CANCEL');
    this.resetControls(true);
  }

  onValidSaveUpload(): void {
    this.changeUploadStatus('IN_PROGRESS');
  }

  private changeUploadStatus(status: string): void {
    if (this.recordSumary) {
        this.uploadService.changeStatus(this.recordSumary?.uploadHistoryId, status)
        .subscribe(
            (res) => {
                this._router.navigate(['/land/upload/history']);
                const dialogRef = this.confirmationService.success(
                    'Registro de Predios',
                    'Se guardo el estado de la carga correctamente'
                );

                dialogRef.afterClosed().toPromise().then( (option) => {
                    this._router.navigate(['/land/upload/history']);
                });
            },
            (error) => {
                this.confirmationService.error(
                    'Registro de usuarios',
                    'Error al guardar el estado de la carga'
                );
            }
        );
    }else {
        console.log('alert error');
    }
  }

  private resetControls(isResetAll = false): void {
      this.uploadfileElement.nativeElement.value = null;
      this.fileName = null;
      this.uploadForm.get('fileUpload').reset();
      this.uploadForm.markAsPristine();
      this._ngxSpinner.hide();
      if (isResetAll) {
        this.uploadId = null;
        this.recordSumary = {};
       }
    }
}
