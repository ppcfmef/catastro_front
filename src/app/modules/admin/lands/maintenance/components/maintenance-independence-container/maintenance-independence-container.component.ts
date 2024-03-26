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
  selector: 'app-maintenance-independence-container',
  templateUrl: './maintenance-independence-container.component.html',
  styleUrls: ['./maintenance-independence-container.component.scss']
})
export class MaintenanceIndependenceContainerComponent implements OnInit,OnChanges {

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
    _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private landMaintenanceService: LandMaintenanceService,
        private _userService: UserService,
        public dialog: MatDialog,
        private applicationMaintenaceService: ApplicationMaintenanceService,
        private _router: Router,
        private _messageProviderService: MessageProviderService
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
    console.log('changes>>',changes);
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
    /*const queryParams={id:this.idLand};
    this.landMaintenanceService.getList(queryParams)
       .toPromise()
       .then(
       (landResult) => {
           this.landRecords = landResult.results;
           this.ubigeo = this.landRecords[0].ubigeo;
       }
       );*/
  }



  onAgregarResult(): void{

    const dialogRef = this.dialog.open(LandMaintenanceFormComponent, {
        data: {action:Actions.CREAR,land:this.landRecords[0], landRecords:this.landRecords,results:this.results},
        width: '600px',
        height:'100%'
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
    application.idType=5;
    application.ubigeo=this.landRecords[0].ubigeo;
    application.username = this.user.id;
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
                    /*this._messageProviderService.showAlert(
                        'Solicitud registrada'
                    );
                    this._router.navigate(['/land/maintenance']);*/

                    const m=this._messageProviderService.showAlert(
                        'Solicitud registrada'
                    );

                    m.afterClosed().subscribe(r=>{
                        this._router.navigate(['/land/maintenance']);
                    });

                }
            });


        }


    });

  }

  fileUpload(file: any): void{

    this.file = file;
  }

}
