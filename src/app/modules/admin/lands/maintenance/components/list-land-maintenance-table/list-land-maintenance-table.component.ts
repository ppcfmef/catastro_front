import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
@Component({
    selector: 'app-list-land-maintenance-table',
    templateUrl: './list-land-maintenance-table.component.html',
    styleUrls: ['./list-land-maintenance-table.component.scss']
})
export class ListLandMaintenanceTableComponent implements OnInit, OnChanges {
    @Input() dataSource: LandUI[];
    @Input() length: number;
    @Input() selectedId: number;
    @Input() reset: boolean;
    @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
    @Output() refreshPage: EventEmitter<any> = new EventEmitter();
    displayedColumns: string[] = ['nro', 'cup', 'status','habilitacionName', 'direccion', 'creationDate', 'typeApplication', 'actions'];
    landSelected = new Set<any>();
    pageIndex = 0;
    pageSize = 5;
    pageSizeOptions = [1, 5, 10, 25, 50, 100, 250, 500];
    user: User;
    _unsubscribeAll: Subject<any> = new Subject<any>();

    typesMaintenance = [
        /*{
        id:1 , text :'Reasignar ubicación',routerLink:'reassignment',
        },*/
        {
            id: 2, text: 'Acumular', routerLink: 'accumulation',
        },
        {
            id: 3, text: 'Subdividir', routerLink: 'split',
        },
        {
            id: 4, text: 'Inactivar', routerLink: null,
        },
        {
            id: 5, text: 'Independizar', routerLink: 'independence',
        },

    ];
    private unsubscribeAll = new Subject<any>();

    constructor(private _router: Router,
        public dialog: MatDialog,
        private _userService: UserService,
        private applicationMaintenaceService: ApplicationMaintenanceService,
        private _messageProviderService: MessageProviderService,
        private _fuseSplashScreenService: FuseSplashScreenService
    ) {

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
            });

    }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes?.dataSource?.currentValue){
            this.dataSource = changes.dataSource.currentValue;
        }
        if (changes?.length?.currentValue) {
            this.pageIndex = 0;
            this.pageSize = 5;
          }

       // Verifica si la propiedad `reset` ha cambiado a `true`
       if (changes.reset && changes.reset.currentValue === true) {
        this.pageIndex = 0;
        this.pageSize = 5;
    }
    }

    ngOnInit(): void {
    }


    onPage(paginator: MatPaginator): void {
        this.pageIndex = paginator.pageIndex;
        this.pageSize = paginator.pageSize;
        this.changePage.emit(paginator);
    }
    onRefreshPage(): void {
        this.refreshPage.emit();
    }

    landSelection(landRecord: LandUI): void {
        const idtypeApplication = landRecord.typeApplication;
        if (idtypeApplication !== 4) {
            const typeMaintenance = this.typesMaintenance.find(e => e.id === idtypeApplication);
            const typeMaintenanceRouterLink = typeMaintenance.routerLink ? typeMaintenance.routerLink : '';
            this._router.navigate(['/land/maintenance', typeMaintenanceRouterLink, landRecord.id]);
        }
        else {


            const dialogRef = this.dialog.open(LandMaintenanceDesactivateComponent, {

                width: '600px', data: { land: landRecord }
            });

            dialogRef.afterClosed().subscribe((result: any) => {

                //console.log(result);
                if (result && result.option) {
                    this._fuseSplashScreenService.show();
                    const application = new ApplicationModel();
                    application.idStatus = 1;
                    application.idType = 4;
                    application.ubigeo = landRecord.ubigeo;
                    application.username = this.user.id;
                    const landRecords = [landRecord];
                    const body = {
                        application: application,
                        results: [],
                        lands: landRecords
                    };

                    this.applicationMaintenaceService.create(body).subscribe((res: ApplicationUI) => {
                        if (result.file) {

                            const dataForm: any = {};
                            dataForm.id_app = res.id;
                            dataForm.file = result.file;

                            this.applicationMaintenaceService.uploadFile(dataForm).subscribe((r: any) => {
                                this._fuseSplashScreenService.hide();
                                if (r && r.success) {
                                    const m = this._messageProviderService.showAlert(
                                        'Solicitud registrada'
                                    );

                                    m.afterClosed().subscribe(r => {
                                        //this._fuseSplashScreenService.hide();
                                        this._router.navigate(['/land/maintenance']);
                                    });

                                    /*this._router.navigate(['/land/maintenance']);*/
                                }
                            },
                            (err)=>{
                              this._fuseSplashScreenService.hide();
                              this._messageProviderService.showAlert(
                              'Error al registrar'
                            );
                          });
                        }

                        else {
                            if (res) {
                                this._fuseSplashScreenService.hide();
                                this._messageProviderService.showAlert(
                                    'Solicitud registrada'
                                );
                                this._router.navigate(['/land/maintenance']);
                            }
                        }

                    },(error)=>{
                        this._fuseSplashScreenService.hide();
                        this._messageProviderService.showAlert(
                            'Error al registrar'
                        );

                    });
                };
            });

        };
    };
}
