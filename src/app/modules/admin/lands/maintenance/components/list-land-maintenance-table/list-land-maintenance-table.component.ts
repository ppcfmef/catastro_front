import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Actions } from 'app/shared/enums/actions.enum';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationUI } from '../../interfaces/application';
import { LandUI } from '../../interfaces/land.interface';
import { ApplicationModel } from '../../models/application.model';
import { ApplicationMaintenanceService } from '../../services/application-maintenance.service';
import { LandMaintenanceDesactivateComponent } from '../land-maintenance-desactivate/land-maintenance-desactivate.component';
@Component({
  selector: 'app-list-land-maintenance-table',
  templateUrl: './list-land-maintenance-table.component.html',
  styleUrls: ['./list-land-maintenance-table.component.scss']
})
export class ListLandMaintenanceTableComponent implements OnInit {
    @Input() dataSource: LandUI[];
    @Input() length: number;
    @Input() selectedId: number;
    @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
    @Output() refreshPage: EventEmitter<any> = new EventEmitter();
    displayedColumns: string[] = ['nro','cpm','cup', 'habilitacionName', 'direccion', 'creationDate','typeApplication','actions'];
    landSelected = new Set<any>();
    pageIndex = 0;
    pageSize = 5;
    pageSizeOptions = [1, 5, 10, 25, 50, 100, 250, 500];
    user: User;
    _unsubscribeAll: Subject<any> = new Subject<any>();

    typesMaintenance =[
        {
        id:1 , text :'Reasignar ubicación',routerLink:'reassignment',
        },
        {
            id:2 , text :'Acumulación',routerLink:'accumulation',
            },
            {
                id:3 , text :'División',routerLink:'split',
                },
                {
                    id:4 , text :'Inactivar',routerLink:null,
                    },
                    {
                        id:5 , text :'Independizar',routerLink:'independence',
                        },

];
    private unsubscribeAll = new Subject<any>();

  constructor( private _router: Router,
    public dialog: MatDialog ,
    private _userService: UserService,
    private applicationMaintenaceService: ApplicationMaintenanceService,
    private _messageProviderService: MessageProviderService
    )
     {

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: any) => {
        this.user = user;
    });

  }

  ngOnInit(): void {
  }

  onPage(paginator: MatPaginator): void {
    this.pageIndex = paginator.pageIndex;
    this.changePage.emit(paginator);
  }
  onRefreshPage(): void {
    this.refreshPage.emit();
  }

  landSelection(landRecord: LandUI): void{
    const idtypeApplication=landRecord.typeApplication;
    if(idtypeApplication!==4){
        const typeMaintenance=this.typesMaintenance.find(e=> e.id===idtypeApplication);
        const typeMaintenanceRouterLink= typeMaintenance.routerLink?typeMaintenance.routerLink:'';
        this._router.navigate(['/land/maintenance',typeMaintenanceRouterLink,landRecord.id]);
    }
    else{


        const dialogRef = this.dialog.open(LandMaintenanceDesactivateComponent, {

            width: '600px',data:{land: landRecord}
          });

          dialogRef.afterClosed().subscribe((result: any) => {

            //console.log(result);
            if(result && result.option){

                const application = new ApplicationModel();
                application.idStatus=1;
                application.idType=4;
                application.ubigeo=landRecord.ubigeo;
                application.username = this.user.id;
                const landRecords=[landRecord];
                const body = {
                    application:application,
                    results: [],
                    lands:landRecords
                };

                this.applicationMaintenaceService.create(body).subscribe((res: ApplicationUI)=>{
                    if(result.file){

                        const dataForm: any= {};
                        dataForm.id_app= res.id;
                        dataForm.file= result.file;

                        this.applicationMaintenaceService.uploadFile(dataForm).subscribe((r: any)=>{
                            if(r && r.success){
                                this._messageProviderService.showAlert(
                                    'Solicitud registrada'
                                );
                                this._router.navigate(['/land/maintenance']);
                            }
                        });
                    }

                    else{
                        if(res ){

                            this._messageProviderService.showAlert(
                                'Solicitud registrada'
                            );
                            this._router.navigate(['/land/maintenance']);
                        }
                    }

                });


            }



            /*const body = {
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
            });*/

          });

    }
  }

  onChangeSolicitud(i: number,row: any): void{

  }
}
