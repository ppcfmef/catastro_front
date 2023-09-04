/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';

import { loadModules } from 'esri-loader';
import { UserService } from 'app/core/user/user.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { TableService } from '../../services/table.service';
import { OperatorService } from '../../services/operator.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOperator, IResult } from '../../interfaces/operator.interface';
import { WidgetService } from '../../services/widget.service';
import moment from 'moment';
import { MessageProviderService } from 'app/shared/services/message-provider.service';

@Component({
    selector: 'app-load-pending-assignment',
    templateUrl: './load-pending-assignment.component.html',
    styleUrls: ['./load-pending-assignment.component.scss'],
})
export class LoadPendingAssignmentComponent implements OnInit, AfterViewInit, OnDestroy{

    _portalUrl =  'https://ws.mineco.gob.pe/portaldf';
    idWebMap = '66adf64572f7438c892056ad832ea39d';
    _unsubscribeAll: Subject<any> = new Subject<any>();
    _currentUser: User;
    _currentUserUbigeo: string;

    tableColumns: TableColumn[] = [];
    dataSource = [];

    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
    };

    user: boolean = false;
    params = {is_active: true, isMobileStaff:true };
    operator: IOperator;
    form: FormGroup;
    oparator= null;
    cards = [
        {
            num: 21,
            text: 'TICKETS ASIGNADAS ACTUALMENTE',
        },
        {
            num: 25,
            text: 'TICKETS ATENDIDOS',
        },
    ];
    codLoad: string;

    constructor(
        private _router: Router,
        private _userService: UserService,
        private _activatedRoute: ActivatedRoute,
        private _tableService: TableService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        protected _messageProviderService: MessageProviderService,
        private _operatorsService: OperatorService,
        private _widgetsService: WidgetService,
        ) {
            this.createFormActions();
        }

    ngOnInit(): void {
        this.setTableColumn();
        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: User) => {
            this._currentUser = user;
            // @SETUBIGEO
            this._currentUserUbigeo = this._currentUser.ubigeo ? this._currentUser.ubigeo : '040703';
        });

        this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe(({cod}) => {
            if (cod) {
                this.codLoad = cod;
                this._tableService.detailLoad(cod, this._currentUserUbigeo).then(data => this.dataSource = data);
            }
        });

    }

    ngAfterViewInit(): void {
        this.form.controls['operador'].valueChanges
            .pipe(  debounceTime(600),
                takeUntil(this._unsubscribeAll))
            .subscribe((dateOperator) => {
                if (!dateOperator) {
                    this.operator = null;
                    console.log(dateOperator, 'dateOperator');
                }else {
                    this.params['search'] = dateOperator;
                    console.log(this.params, '');
                    this.user = true;
                    this.getOperator();
                }
        }
        );
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getWidget(): void {
        this._widgetsService.listWidget(this._currentUserUbigeo);
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
        this._router.navigate(['../../'], {relativeTo: this._activatedRoute});
    }

    async zoom(row): Promise<any> {
        await this._tableService.zoomRow(row);
    }

    createFormActions(): void {
        this.form = new FormGroup({
            fEntrega: new FormControl('', [Validators.required]),
            operador: new FormControl('', [Validators.required]),
        });
    };

    async getOperator(): Promise<any> {
        await this._operatorsService.getOperador(this.params).subscribe(async (data: IResult) => {
            this._fuseSplashScreenService.show();
            this.operator = data.results[0];
            if(this.operator){
                await this._widgetsService.widgetUser(this._currentUserUbigeo , this.operator.id).then(({attended ,pending }) => {
                    this.cards[0].num = pending;
                    this.cards[1].num = attended;
                });
                this._fuseSplashScreenService.hide();
            }
            else {
                this._messageProviderService.showSnackInfo('No existe Operador');
                this._fuseSplashScreenService.hide();
            }
        });

    }

    async assigment(): Promise<void> {
        this._fuseSplashScreenService.show(0);
        const rawValue = this.form.getRawValue();
        if (!rawValue.fEntrega) {
            this._messageProviderService.showSnackError('debe seleccionar fecha de entrega');
            this._fuseSplashScreenService.hide();
            return;
        }
        const date = moment(this.form.controls.fEntrega.value).format('DD-MM-YYYY');
        console.log(date, 'fecha');
        const operator = this.operator.id;
        const nameOperator = `${this.operator.firstName} ${this.operator.lastName}`;
        const workload = this.codLoad;
        const dateLimit = moment(this.form.controls.fEntrega.value).format('DD-MM-YYYY');
        const ubigeo = this._currentUserUbigeo;
        await this._tableService.assigmentOperator(operator, nameOperator, workload, dateLimit, ubigeo)
            .then(async (result) => {
                console.log(result, 'result');
                this._tableService._updateTable.next(true);
                this.getWidget();
                await this._messageProviderService.showSnack('Asignado correctament');
                this.form.reset();
                this.redirecto();
                //window.location.reload();
                this._fuseSplashScreenService.hide();
            })
            .catch((error)=> {
                console.log(error, 'errr');
                this._messageProviderService.showSnackError('Error al asignar carga');
                window.location.reload();
            });

    }


}
