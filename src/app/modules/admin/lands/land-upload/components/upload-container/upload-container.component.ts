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

  selectForm = new FormGroup({
    selectType: new FormControl(null, [Validators.required]),
    checkFormatList: new FormControl(null)
  });

  typesUpload = [
      { code: 1, text: 'Carga de TB_PREDIO_T'},
      { code: 99, text: 'Carga Multiple'}
  ];

  listFormatMultiple = [

        { code: 1, text: 'Tabla RT_Contribuyente' },
        { code: 2, text: 'Tabla RT_MarcoPredio' },
        { code: 3, text: 'Tabla RT_Arancel' },
        { code: 4, text: 'Tabla RT_Predio_dato' },
        { code: 5, text: 'Tabla RT_Predio_caract' },
        { code: 6, text: 'Tabla RT_Recaudacion' },
        { code: 7, text: 'Tabla RT_Deuda' },
        { code: 8, text: 'Tabla RT_Emision' },
        { code: 9, text: 'Tabla RT_BImponible' },
        { code: 10, text: 'Tabla RT_Alicuota' },
        { code: 11, text: 'Tabla RT_AmnContribuyente' },
        { code: 12, text: 'Tabla RT_AmnMunicipal' },
        { code: 13, text: 'Tabla RT_VarEm_muni' }
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
    this.route.params.subscribe((params) => {
        const uploadHistoryId = params?.uploadHistoryId;
        if (uploadHistoryId) {
            this.uploadService.uploadHistorySummary(Number(uploadHistoryId))
            .subscribe(res => this.recordSumary = res);
        }else {
            this.isUpload = true;
        }
    });

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
                const timerId = setInterval(() => {
                  this.uploadService.uploadHistorySummary(Number(this.recordSumary.uploadHistoryId))
                  .subscribe((resSumary) => {
                    this.recordSumary = resSumary;
                    if (this.recordSumary.status === 'LOADED_TMP' || this.recordSumary.status === 'CANCEL') {
                      clearInterval(timerId);
                    }
                  });
                }, 5000);
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

  onDownloadRecordsUpload(status: string): void {
    const queryParams = {'status': status};
    const exportUrl = this.exportReportService.getUrlExportReport(`/land/uploads/${this.recordSumary?.uploadHistoryId}/`, queryParams);
    window.open(exportUrl, '_blank');
  }

  onGoToHistory(): void {
    this._router.navigate(['/land/upload/history']);
  }

  onGoToLandRecords(): void {
    this._router.navigate(['/land/registry/search/search-land']);
  }

  onReloadPage(): void {
    this._router.routeReuseStrategy.shouldReuseRoute = (): boolean => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/land/upload/new']);
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

                if (this.recordSumary.status === 'IN_PROGRESS') {
                  const timerValidId = setInterval(() => {
                    this.uploadService.uploadHistorySummary(Number(this.recordSumary.uploadHistoryId))
                    .subscribe((resSumary) => {
                      this.recordSumary = resSumary;
                      if (this.recordSumary.status === 'LOADED' || this.recordSumary.status === 'CANCEL') {
                        clearInterval(timerValidId);
                      }
                    });
                  }, 10000);
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
      this.uploadForm.get('fileUpload').reset();
      this.uploadForm.markAsPristine();
      this._ngxSpinner.hide();
      if (isResetAll) {
        this.uploadId = null;
        this.recordSumary = null;
       }
    }
}
