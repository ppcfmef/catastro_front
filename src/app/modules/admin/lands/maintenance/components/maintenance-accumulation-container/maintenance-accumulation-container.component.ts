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

@Component({
  selector: 'app-maintenance-accumulation-container',
  templateUrl: './maintenance-accumulation-container.component.html',
  styleUrls: ['./maintenance-accumulation-container.component.scss']
})
export class MaintenanceAccumulationContainerComponent implements OnInit,OnChanges {
    @Input() idLand: number;
    landRecords: LandUI[]=[];
    application: ApplicationModel;
    results: ResultUI[];
    user: User;

    ubigeo: string;
    fileName: string;
    file: any;
    disabled =false;
    _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private landMaintenanceService: LandMaintenanceService,
    private _userService: UserService,
    public dialog: MatDialog,
    private applicationMaintenaceService: ApplicationMaintenanceService,
    private _router: Router,
    protected _messageProviderService: MessageProviderService,
    private confirmationService: CustomConfirmationService,
    private _fuseSplashScreenService: FuseSplashScreenService
    ) {

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: any) => {
        this.user = user;
    });
    //this.usernameService.user

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
       }
       );
    }
}

  ngOnInit(): void {
  }

  onAgregarPredio(land: LandUI): void{
    console.log('land>>',land);
    const copy=[... this.landRecords];
    const el=copy.find(e=> {if( (e?.cup && e.cup===land.cup) || (e?.cpm && e.cpm===land.cpm) ){return e;}  } );
    if(!el){
        copy.push(land);
        this.landRecords=copy;
    }

  }

  ondataSourceUpdate(landRecords: LandUI[]): void{
    this.landRecords =landRecords;
  }



  onGenerateAccumulation(): void{

    const application = new ApplicationModel();
    application.idStatus=1;
    application.idType=2;
    application.ubigeo=this.landRecords[0].ubigeo;
    application.username = this.user.id;
    this.disabled =false;

    const dialogRef = this.dialog.open(LandMaintenanceFormComponent, {
        //data: {action:Actions.CREAR,ubigeo:this.landRecords[0].ubigeo},
        data: {action:Actions.CREAR,land:this.landRecords[0], landRecords:this.landRecords,results:this.results },
        width: '600px',
        height:'100%'
      });

      dialogRef.afterClosed().subscribe((result) => {
        this._fuseSplashScreenService.show();
        console.log('result>>',result);
        console.log('The dialog was closed');
        this.results =  [new ResultModel(result)];
        const body = {
            application:application,
            results: this.results,
            lands:this.landRecords
        };

        this.applicationMaintenaceService.create(body).subscribe((res: ApplicationUI)=>{
            if(res){
                const dataForm: any= {};
                dataForm.id_app= res.id;
                dataForm.file= this.file;
                this.applicationMaintenaceService.uploadFile(dataForm).subscribe((r: any)=>{
                    if(r && r.success){

                        const m=this._messageProviderService.showAlert(
                            'Solicitud registrada'
                        );
                        this._fuseSplashScreenService.hide();

                        m.afterClosed().subscribe(r=>{
                          this.disabled =true;
                            this._router.navigate(['/land/maintenance']);
                        });

                    }
                });
            }
        },(err)=>{
            this._fuseSplashScreenService.hide();
            console.log('error',err);
            this.confirmationService.error(
              'Registro de predio',
               `Error al registrar el predio, ${err.error.message}`
            );
          });
      });


  }

  fileUpload(file: any): void{

    this.file = file;
  }

}
