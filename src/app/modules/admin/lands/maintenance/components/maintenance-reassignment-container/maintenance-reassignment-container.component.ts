import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LandUI } from '../../interfaces/land.interface';
import { LandMaintenanceService } from '../../services/land-maintenance.service';
import { ApplicationModel } from '../../models/application.model';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApplicationMaintenanceService } from '../../services/application-maintenance.service';
import { Router } from '@angular/router';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { ApplicationUI } from '../../interfaces/application';

@Component({
  selector: 'app-maintenance-reassignment-container',
  templateUrl: './maintenance-reassignment-container.component.html',
  styleUrls: ['./maintenance-reassignment-container.component.scss']
})
export class MaintenanceReassignmentContainerComponent implements OnInit,OnChanges {
    @Input() idLand: number;
    landRecords: LandUI[]=[];
    user: User;
    fileName: string;
    file: any;
    _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private landMaintenanceService: LandMaintenanceService,
    private _userService: UserService,
private applicationMaintenaceService: ApplicationMaintenanceService,
private _router: Router,
protected _messageProviderService: MessageProviderService,
    ) {
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
           }
           );
        }
    }


  ngOnInit(): void {

  }

  fileUpload(file: any): void{

    this.file = file;
  }

  onGenerateApplication(): void{
    const application = new ApplicationModel();
    application.idStatus=1;
    application.idType=1;
    application.ubigeo=this.landRecords[0].ubigeo;
    application.username = this.user.id;

    const body = {
        application:application,
        results:this.landRecords,
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

  }
}
