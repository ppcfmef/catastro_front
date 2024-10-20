import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Actions } from 'app/shared/enums/actions.enum';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationUI } from '../../interfaces/application';
import { LandUI } from '../../interfaces/land.interface';
import { ResultUI } from '../../interfaces/result.interface';
import { ApplicationModel } from '../../models/application.model';
import { ResultModel } from '../../models/result.model';
import { ApplicationMaintenanceService } from '../../services/application-maintenance.service';
import { LandMaintenanceService } from '../../services/land-maintenance.service';
import { LandMaintenanceFormComponent } from '../land-maintenance-form/land-maintenance-form.component';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { FormatUtils } from 'app/shared/utils/format.utils';

@Component({
  selector: 'app-maintenance-split-container',
  templateUrl: './maintenance-split-container.component.html',
  styleUrls: ['./maintenance-split-container.component.scss']
})
export class MaintenanceSplitContainerComponent implements OnInit,OnChanges {
    @Input() idLand: number;
    ubigeo: string;
    landRecords: LandUI[]=[];
    application: ApplicationModel;
    results: ResultUI[]=[];
    user: User;
    leer=Actions.LEER;
    editar= Actions.EDITAR;
    fileName: string;
    file: any;
    landAffected: any[]=[];
    _unsubscribeAll: Subject<any> = new Subject<any>();
    disabled = false;

    data = {
      title: 'Volver a la Lista de Predios',
      routerLink: '/land/maintenance/list',
    };
    constructor(
        private landMaintenanceService: LandMaintenanceService,
        private _userService: UserService,
        public dialog: MatDialog,
        private applicationMaintenaceService: ApplicationMaintenanceService,
        private _router: Router,
        private _messageProviderService: MessageProviderService,
        private confirmationService: CustomConfirmationService,
        private _fuseSplashScreenService: FuseSplashScreenService
        ) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
            });
    }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes.idLand.currentValue){
    const queryParams={id:this.idLand};
    this.landMaintenanceService.getList(queryParams)
       .toPromise()
       .then(
       (landResult) => {
           this.landRecords = landResult.results;
           this.ubigeo = this.landRecords[0].ubigeo;
           const copy = this.landRecords[0].landsAffected;
           copy.forEach((element) => {
                element.ubigeo = this.landRecords[0].ubigeo;
                element.habilitacionName = this.landRecords[0].habilitacionName;
                element.codUu = landResult.results[0].codUu;
                element.uuType= landResult.results[0].uuType;
           });
           this.landAffected = copy;
       }
       );
    }
}


  ngOnInit(): void {
  }



  onAgregarResult(): void{

    const dialogRef = this.dialog.open(LandMaintenanceFormComponent, {
        data: {action:Actions.CREAR,land:this.landRecords[0], landRecords:this.landRecords,results:this.results},
        width: '600px',
        /*height:'100%'*/
      });

      dialogRef.afterClosed().subscribe((res) => {
        //console.log('result>>',result);
        if(res){
            const copy=[... this.results];
            copy.push(new ResultModel(res));
            this.results = copy;
        }


      });


  }

  ondataSourceUpdate(landRecords: LandUI[]): void{
    this.results =landRecords;
  }

  onGenerateSplit(): void {
    const application = new ApplicationModel();
    application.idStatus=1;
    application.idType=3;
    application.ubigeo=this.landRecords[0].ubigeo;
    application.username = this.user.id;
    this.results= this.results.map(r=>  FormatUtils.formatResultUIToResultUI(r));
    const body = {
        application:application,
        results: this.results,
        lands:this.landRecords
    };

    this._fuseSplashScreenService.show();
    this.disabled =true;
    this.applicationMaintenaceService.create(body).subscribe((res: ApplicationUI)=>{
        if(res){
            const dataForm: any= {};
            dataForm.id_app= res.id;
            dataForm.file= this.file;
            this.applicationMaintenaceService.uploadFile(dataForm).subscribe((r: any)=>{
                if(r && r.success){
                    /*this._messageProviderService.showAlert(
                        'Solicitud registrada'
                    );
                    this._router.navigate(['/land/maintenance']);*/
                    this._fuseSplashScreenService.hide();

                    const m=this._messageProviderService.showAlert(
                        'Solicitud registrada'
                    );

                    m.afterClosed().subscribe(()=>{
                        this.disabled =false;

                        this._router.navigate(['/land/maintenance']);
                    });

                }
            },
            (err)=>{
              this._fuseSplashScreenService.hide();

            this.confirmationService.error(
              'Registro de predio',
               `Error al registrar el predio, ${err.error.message}`
            );
          }

            );


        }


    },(err)=>{
        this._fuseSplashScreenService.hide();
      this.confirmationService.error(
        'Registro de predio',
         `Error al registrar el predio, ${err.error.message}`
      );
    });

  }

  fileUpload(file: any): void{

    this.file = file;
  }
}
