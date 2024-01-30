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
import { user } from '../../../../../../mock-api/common/user/data';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
@Component({
    selector: 'app-load-attend',
    templateUrl: './load-attend.component.html',
    styleUrls: ['./load-attend.component.scss']
})
export class LoadAttendComponent implements OnInit, AfterViewInit, OnDestroy {
    _unsubscribeAll: Subject<any> = new Subject<any>();
    _currentUserUbigeo: string;
    _fecha;

    tableColumns: TableColumn[] = [];
    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
    };
    dataSource = [];
    newCod: string;
    codOperator;
    operator;
    dateOperator;
    result;
    cards = [
        {
            num: 0,
            text: 'TICKETS PENDIENTES'
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
        protected _messageProviderService: MessageProviderService,
    ) { }

    ngOnInit(): void {
        this.setTableColumn();
        this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ cod }) => {
            if (cod) {
                this.newCod = cod;
            }
        });

        this._operatorsService.getUbigeo().subscribe((ubigeo) => {
            this._currentUserUbigeo = ubigeo;
            this._fuseSplashScreenService.show();
            this._tableService.detailLoad(this.newCod, this._currentUserUbigeo)
                .then((data) => {
                    this.dataSource = data;
                    this._tableService.getDataByWorkLoad(this._currentUserUbigeo, this.newCod).then((resp) => {
                        this._fecha = resp.dateLimit;
                        this.operator = resp.user;
                        this.cards[0].num = resp.user.statsUser.pending;
                        this.cards[1].num = resp.user.statsUser.attended;
                        this._fuseSplashScreenService.hide();
                    });
                })
                .catch((err) => {
                    this.dataSource = [];
                    this.cards[0].num = 0;
                    this.cards[1].num = 0;
                    this.operator = null;
                    this._fecha = null;
                    this._messageProviderService.showSnackError(`${err} en el actual Ubigeo`);
                    this._fuseSplashScreenService.hide();
                });
        });


    }

    ngAfterViewInit(): void {
        console.log(this.result, 'resptafff');

    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    setTableColumn(): void {
        this.tableColumns = [
            { matheaderdef: 'Nro', matcolumndef: 'nro', matcelldef: 'nro' },
            { matheaderdef: 'Codigo', matcolumndef: 'CODIGO', matcelldef: 'CODIGO' },
            { matheaderdef: 'Tipo', matcolumndef: 'TIPO', matcelldef: 'TIPO' },
            { matheaderdef: 'Fuente', matcolumndef: 'FUENTE', matcelldef: 'FUENTE' },
        ];
    }

    onZoom(row: any): void {
        this.zoom(row);
    }

    redirecto(): void {
        this._router.navigate(['../../'], { relativeTo: this._activatedRoute });
    }

    async zoom(row): Promise<any> {
        await this._tableService.zoomRow(row).then(data => console.log(data));
    }

}
