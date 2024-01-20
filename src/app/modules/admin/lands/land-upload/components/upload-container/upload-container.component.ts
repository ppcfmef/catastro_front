import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormUtils} from '../../../../../../shared/utils/form.utils';
import { UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import {MessageProviderService} from '../../../../../../shared/services/message-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadhistoryService } from '../../services/uploadhistory.service';
import { ExportReportService } from 'app/shared/services/export-report.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-container',
  templateUrl: './upload-container.component.html',
  styleUrls: ['./upload-container.component.scss']
})
export class UploadContainerComponent implements OnInit {
  @ViewChild('uploadfile') uploadfileElement: ElementRef;
  uploadId: number;
  uploadForm = new UntypedFormGroup({
    fileUpload: new UntypedFormControl(null, [Validators.required]),
  });

  selectForm = new UntypedFormGroup({
    selectType: new UntypedFormControl(null, [Validators.required]),
    checkFormatList: new UntypedFormControl(null)
  });

  typesUpload = [
      { code: 1, text: 'Carga de TB_PREDIO_T'},
      { code: 99, text: 'Carga de ESQUEMAS CF'}
  ];

  listFormatMultiple = [

        { code: 'RT_CONTRIBUYENTE', text: 'Tabla RT_Contribuyente' },
        { code: 'RT_MARCO_PREDIO', text: 'Tabla RT_MarcoPredio' },
        { code: 'RT_ARANCEL', text: 'Tabla RT_Arancel' },
        { code: 'RT_PREDIO_DATO', text: 'Tabla RT_Predio_dato' },
        { code: 'RT_PREDIO_CARACT', text: 'Tabla RT_Predio_caract' },
        { code: 'RT_RECAUDACION', text: 'Tabla RT_Recaudacion' },
        { code: 'RT_DEUDA', text: 'Tabla RT_Deuda' },
        { code: 'RT_EMISION', text: 'Tabla RT_Emision' },
        { code: 'RT_BIMPONIBLE', text: 'Tabla RT_BImponible' },
        { code: 'RT_ALICUOTA', text: 'Tabla RT_Alicuota' },
        { code: 'RT_AMNCONTRIBUYENTE', text: 'Tabla RT_AmnContribuyente' },
        { code: 'RT_AMNMUNICIPAL', text: 'Tabla RT_AmnMunicipal' },
        { code: 'RT_VAREM_MUNI', text: 'Tabla RT_VarEm_muni' }
  ];

  isUpload = false;

  recordSumary: any;

  fileName: string;

  uploadMultiple = false;

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



  get fileUpload(): UntypedFormControl {
      return this.uploadForm.get('fileUpload') as UntypedFormControl;
  }

  async parseFormFile(): Promise<void> {
      if (this.uploadForm.valid && this.uploadForm.dirty) {
          const rawValue = this.uploadForm.getRawValue();
          const payload = FormUtils.parseToFormData(rawValue);
          await this.uploadFormFile(false, payload);
      } else {
          this.uploadForm.markAsTouched();
      }
  }

  async parseMultipleFile(): Promise<void> {
    if (this.uploadForm.valid && this.uploadForm.dirty) {
        const rawValue = this.uploadForm.getRawValue();
        const selectRawValue = this.selectForm.getRawValue();
        const typeUpload = selectRawValue.checkFormatList?.code;
        const payload = FormUtils.parseToFormData({
          fileUpload: rawValue.fileUpload,
          typeUpload: typeUpload
        });
        await this.uploadFormFile(true, payload);
    } else {
        this.uploadForm.markAsTouched();
    }
}

  getUploadFile(uploadMultiple: boolean, payload: FormData): Observable<any> {
    if (uploadMultiple) {
      return this.uploadService.uploadMultipleFile(payload);
    }else {
      return this.uploadService.uploadFile(payload);
    }
  }

  async uploadFormFile(uploadMultiple: boolean, payload: FormData): Promise<void> {
      try {
          this._ngxSpinner.show();
          this.getUploadFile(uploadMultiple, payload)
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
          throw new Error('Err:' + err?.error?.statusText);
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
    this.changeUploadStatus(false, 'CANCEL');
  }

  onValidSaveUpload(): void {
    this.recepcionarValidos();
    this.changeUploadStatus(false, 'IN_PROGRESS');
  }

  onValidSaveMultipleUpload(): void {
    this.recepcionarValidos();
    this.changeUploadStatus(true, 'IN_PROGRESS');
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

  private getUploadStatus(uploadMultiple: boolean, status: string): Observable<any> {
    if (uploadMultiple) {
      return this.uploadService.changeMultipleStatus(this.recordSumary?.uploadHistoryId, status);
    }else {
      return this.uploadService.changeStatus(this.recordSumary?.uploadHistoryId, status);
    }
  }

  private changeUploadStatus(uploadMultiple: boolean, status: string): void {
    if (this.recordSumary) {
        this.getUploadStatus(uploadMultiple, status)
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
