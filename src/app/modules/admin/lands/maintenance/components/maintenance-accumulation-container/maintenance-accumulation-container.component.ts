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

    _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private landMaintenanceService: LandMaintenanceService,
    private _userService: UserService,
    public dialog: MatDialog,
    private applicationMaintenaceService: ApplicationMaintenanceService,
    private _router: Router,
    protected _messageProviderService: MessageProviderService,
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
    const copy=[... this.landRecords];
    const el=copy.find(e=> e.cup===land.cup);
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


    const dialogRef = this.dialog.open(LandMaintenanceFormComponent, {
        //data: {action:Actions.CREAR,ubigeo:this.landRecords[0].ubigeo},
        data: {action:Actions.CREAR,land:this.landRecords[0]},
        width: '600px',
        height:'100%'
      });

      dialogRef.afterClosed().subscribe((result) => {
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
                        this._messageProviderService.showAlert(
                            'Solicitud registrada'
                        );
                        this._router.navigate(['/land/maintenance']);
                    }
                });
            }
        });

      });


  }

  fileUpload(file: any): void{

    this.file = file;
  }

}
