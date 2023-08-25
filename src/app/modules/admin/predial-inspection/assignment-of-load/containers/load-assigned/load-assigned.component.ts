import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';

import { loadModules } from 'esri-loader';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';



@Component({
    selector: 'app-load-assigned',
    templateUrl: './load-assigned.component.html',
    styleUrls: ['./load-assigned.component.scss'],
})
export class LoadAssignedComponent implements OnInit, AfterViewInit,OnDestroy {
    _portalUrl =  'https://ws.mineco.gob.pe/portaldf';
    idWebMap = '66adf64572f7438c892056ad832ea39d';
    _unsubscribeAll: Subject<any> = new Subject<any>();
    _currentUser: User;
    _currentUserUbigeo: string;


     // Properties table
    tableColumns: TableColumn[] = [];
    dataSource = [];
    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
    };

    // Properties widget
    user: boolean = true;
    cards = [
        {
            num: 21,
            text: 'UNIDADES ASIGNADAS ACTUALMENTE',
        },
        {
            num: 25,
            text: 'TICKETS ATENDIDOS',
        },
    ];

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _userService: UserService,
        private _fuseSplashScreenService: FuseSplashScreenService,


        ) {}

    ngOnInit(): void {
        this.setTableColumn();
        this.setTableColumn();
        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: User) => {
            this._currentUser = user;
            // @SETUBIGEO
            this._currentUserUbigeo = this._currentUser.ubigeo ? this._currentUser.ubigeo : '040703';
        });

    }

    ngAfterViewInit(): void {
        this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe(({cod}) => {
            this._fuseSplashScreenService.show();
            if (cod) {
                this.detailLoad(cod,this._currentUserUbigeo);
                this._fuseSplashScreenService.hide();
            }
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    desasignar(): void {
        this.user = false;
    }

    setTableColumn(): void {
        this.tableColumns = [
            { matheaderdef: 'Nro', matcolumndef: 'nro', matcelldef: 'nro' },
            { matheaderdef: 'Codigo',matcolumndef: 'CODIGO',matcelldef: 'CODIGO'},
            { matheaderdef: 'Tipo',matcolumndef: 'TIPO',matcelldef: 'TIPO'},
            { matheaderdef: 'Fuente', matcolumndef: 'FUENTE', matcelldef: 'FUENTE'},
        ];
    }


    onZoom(row: any): void {
        console.log('zoom');
    }

    redirecto(): void {
        this._router.navigate(['../../'], {relativeTo: this._activatedRoute});
    }

    async detailLoad(workLoadData, ubigeouser): Promise<void> {
        try {
            const [ newQuery,query] = await loadModules([ 'esri/rest/support/Query','esri/rest/query']);

            const idDetailWorkLoadLayer = 'https://ws.mineco.gob.pe/serverdf/rest/services/pruebas/CAPAS_INSPECCION_AC/MapServer/5';
            const ubigeo = ubigeouser;
            //const workLoadData = { oid: 3238, nro: 1, cod_carga: '00093', fecha: '17-08-2023' };

            const queryDetailWorkLoad = new newQuery();
            queryDetailWorkLoad.where = `ID_CARGA = '${ubigeo}${workLoadData}'`;
            queryDetailWorkLoad.outFields = ['*'];
            queryDetailWorkLoad.returnGeometry = false;

            query.executeQueryJSON(idDetailWorkLoadLayer, queryDetailWorkLoad)
                .then((response) => {
                    if (response.features.length > 0) {
                        // aqui esta el detalle de la carga para agregar a la tabla
                        const dataTable = response.features.map(row => row.attributes);
                        dataTable.map((item, index) => Object.assign(item, {nro: `${index+1}`}));
                        this.dataSource = dataTable;
                        return;
                    }
                    return Promise.reject(`No se encontró la carga ${workLoadData} `);
                })
                .catch((error) => {
                    // Aqui se muestran los posibles errores
                    console.log(error);
                });
        }
        catch (error) {
            console.log('EsriLoader: ', error);
        }
    }

}
