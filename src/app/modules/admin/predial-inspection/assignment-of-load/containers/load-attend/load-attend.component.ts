import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';

import { loadModules } from 'esri-loader';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { TableService } from '../../services/table.service';
@Component({
    selector: 'app-load-attend',
    templateUrl: './load-attend.component.html',
    styleUrls: ['./load-attend.component.scss']
})
export class LoadAttendComponent implements OnInit,AfterViewInit, OnDestroy {
    _portalUrl =  'https://ws.mineco.gob.pe/portaldf';
    idWebMap = '66adf64572f7438c892056ad832ea39d';
    _unsubscribeAll: Subject<any> = new Subject<any>();
    _currentUserUbigeo: string;

    tableColumns: TableColumn[] =[];
    tableConfig: TableConifg = {
        isAction: true,
        isZoom:true,
    };
    dataSource = [];

    cards =[
        {
            num: 21,
            text: 'UNIDADES ASIGNADAS ACTUALMENTE'
        },
        {
            num: 25,
            text: 'TICKETS ATENDIDOS'
        }
    ];

    constructor(
        private _router: Router,
        private _userService: UserService,
        private _tableService: TableService,
        private _activatedRoute: ActivatedRoute,
        private _fuseSplashScreenService: FuseSplashScreenService,
        ) { }

        ngOnInit(): void {
            this.setTableColumn();
            this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this._currentUserUbigeo = user.ubigeo ? user.ubigeo : '040703';
            });

        }

        ngAfterViewInit(): void {
            this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe(({cod}) => {
                if (cod) {
                    this._tableService.detailLoad(cod, this._currentUserUbigeo).then(data => this.dataSource = data);
                }
            });
        }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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
            this.zoom(row);
        }

        redirecto(): void {
            this._router.navigate(['../../'], { relativeTo: this._activatedRoute });
        }

        async zoom(row): Promise<any> {
            await this._tableService.zoomRow(row).then(data =>  console.log(data));
        }
}
