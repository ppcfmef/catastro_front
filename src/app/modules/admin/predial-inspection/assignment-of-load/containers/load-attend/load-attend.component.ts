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
import { OperatorService } from '../../services/operator.service';
import { WidgetService } from '../../services/widget.service';
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
    _fecha;

    tableColumns: TableColumn[] =[];
    tableConfig: TableConifg = {
        isAction: true,
        isZoom:true,
    };
    dataSource = [];
    newCod;
    codOperator;
    operator;
    cards =[
        {
            num: 0,
            text: 'TICKETS ASIGNADAS ACTUALMENTE'
        },
        {
            num: 0,
            text: 'TICKETS ATENDIDOS'
        }
    ];

    constructor(
        private _router: Router,
        private _userService: UserService,
        private _tableService: TableService,
        private _activatedRoute: ActivatedRoute,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _operatorsService: OperatorService,
        private _widgetService: WidgetService,
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
                    [this.newCod , this.codOperator] = cod.split('-');
                    this._tableService.detailLoad(this.newCod, this._currentUserUbigeo).then(data => this.dataSource = data);
                    this._operatorsService.getOperatorById(this.codOperator).subscribe(data => this.operator = data);
                    this._widgetService.widgetUser(this._currentUserUbigeo , this.codOperator).then(({attended ,pending }) => {
                        this.cards[0].num = pending;
                        this.cards[1].num = attended;
                    });
                    this._tableService.fechaLoad(this.newCod,this._currentUserUbigeo).then(res=> this._fecha = res);
                }
            });

            // this._tableService.getDataByWorkLoad(this._currentUserUbigeo,this.newCod).then(data => console.log(data, 'new data trasn'));
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
