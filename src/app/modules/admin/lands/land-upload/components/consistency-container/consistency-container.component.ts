import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
 import {FormUtils} from '../../../../../../shared/utils/form.utils';
 import { FormControl, FormGroup, Validators} from '@angular/forms';
 import {NgxSpinnerService} from 'ngx-spinner';
 import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
 import {MessageProviderService} from '../../../../../../shared/services/message-provider.service';
 import { ActivatedRoute, Router } from '@angular/router';
 import { UploadhistoryService } from '../../services/uploadhistory.service';
 import { ExportReportService } from 'app/shared/services/export-report.service';

@Component({
  selector: 'app-consistency-container',
  templateUrl: './consistency-container.component.html',
  styleUrls: ['./consistency-container.component.scss']
})
export class ConsistencyContainerComponent implements OnInit {


    @ViewChild('uploadfile') uploadfileElement: ElementRef;
    uploadId: number;
    uploadForm = new FormGroup({
      fileUpload: new FormControl(null, [Validators.required]),
    });

    selectForm = new FormGroup({
      selectType: new FormControl(null, [Validators.required]),
      checkFormatList: new FormControl(null)
    });

    typesUpload = [
        { code: 1, text: 'Carga de TB_PREDIO_T'},
        { code: 99, text: 'Carga Multiple'}
    ];

    listFormatMultiple = [

          { code: 1, text: 'Formato 01', success:true },
          { code: 2, text: 'Formato 02', success:false},
          { code: 3, text: 'Formato 03', success:false},
          { code: 4, text: 'Formato 04', success:false},
          { code: 5, text: 'Formato 05', success:false},
          { code: 6, text: 'Formato 06', success:false},
          { code: 7, text: 'Formato 07', success:false},
          { code: 8, text: 'Formato 08', success:false},
          { code: 9, text: 'Formato 09', success:false},
          { code: 10, text: 'Formato 10', success:false},
          { code: 11, text: 'Formato 11', success:false},
          { code: 12, text: 'Formato 12', success:false},
          { code: 13, text: 'Formato 13', success:false},
    ];

    isUpload = false;

    recordSumary: any;

    fileName: string;

    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _ngxSpinner: NgxSpinnerService,
        private _messageProviderService: MessageProviderService,
        private uploadService: UploadhistoryService,
        private confirmationService: CustomConfirmationService,
        private exportReportService: ExportReportService,
    ) {
    }

    ngOnInit(): void {

      this.selectForm.get('selectType').valueChanges.subscribe((value) =>{
          if(value === null){
              this.resetControls(true);
          }
          if(value !== 99){
              this.selectForm.get('checkFormatList').reset();
          }
      });
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
    }

    onValidSaveUpload(): void {
      this.recepcionarValidos();
      this.changeUploadStatus('IN_PROGRESS');
    }



    onReloadPage(): void {
      window.location.reload();
    }

    private changeUploadStatus(status: string): void {
      if (this.recordSumary) {
          this.uploadService.changeStatus(this.recordSumary?.uploadHistoryId, status)
          .subscribe(
              (res) => {
                  this._ngxSpinner.hide();
                  this.recordSumary.status = res.status;
                  if (status === 'CANCEL') {
                      this.onReloadPage();
                  }
              },
              (error) => {
                  this._ngxSpinner.hide();
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
          this.recordSumary = null;
         }
      }
  }
