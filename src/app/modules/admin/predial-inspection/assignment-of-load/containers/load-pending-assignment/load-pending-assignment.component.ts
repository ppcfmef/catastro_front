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
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { IOperator, IResult } from '../../interfaces/operator.interface';
import { WidgetService } from '../../services/widget.service';
import moment from 'moment';
import { MessageProviderService } from 'app/shared/services/message-provider.service';

@Component({
    selector: 'app-load-pending-assignment',
    templateUrl: './load-pending-assignment.component.html',
    styleUrls: ['./load-pending-assignment.component.scss'],
})
export class LoadPendingAssignmentComponent implements OnInit, AfterViewInit, OnDestroy {

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
    params = { is_active: true, isMobileStaff: true };
    operator: IOperator;
    form: UntypedFormGroup;
    oparator = null;
    cards = [
        {
            num: 21,
            text: 'TICKETS PENDIENTES',
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

        this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ cod }) => {
            if (cod) {
                this.codLoad = cod;
            }
        });

        this._operatorsService.getUbigeo().subscribe((ubigeo) => {
            this._currentUserUbigeo = ubigeo;
            this.params['district'] = this._currentUserUbigeo;
            this._tableService.detailLoad(this.codLoad, this._currentUserUbigeo)
                .then(data => this.dataSource = data)
                .catch((err) => {
                    this.dataSource = [];
                    this._messageProviderService.showSnackError(`${err} en el actual Ubigeo`);
                });
        });



        // this._userService.user$
        // .pipe(takeUntil(this._unsubscribeAll))
        // .subscribe((user: User) => {
        //     this._currentUser = user;
        //     // @SETUBIGEO
        //     this._currentUserUbigeo = this._currentUser.ubigeo ? this._currentUser.ubigeo : '150101';
        // });

    }

    ngAfterViewInit(): void {
        this.form.controls['operador'].valueChanges
            .pipe(debounceTime(600),
                takeUntil(this._unsubscribeAll))
            .subscribe((dateOperator) => {
                if (!dateOperator) {
                    this.operator = null;
                } else {
                    this.params['search'] = dateOperator;
                    this.user = true;
                    this.getOperator();
                }
            }
            );
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // getWidget(): void {
    //     this._widgetsService.listWidget(this._currentUserUbigeo);
    // }

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
        await this._tableService.zoomRow(row);
    }

    createFormActions(): void {
        this.form = new UntypedFormGroup({
            fEntrega: new UntypedFormControl('', [Validators.required]),
            operador: new UntypedFormControl('', [Validators.required]),
        });
    };

    async getOperator(): Promise<any> {
        await this._operatorsService.getOperador(this.params).subscribe(async (data: IResult) => {
            this._fuseSplashScreenService.show();
            this.operator = data.results[0];
            if (this.operator) {
                await this._widgetsService.widgetUser(this._currentUserUbigeo, this.operator.id).then(({ attended, pending }) => {
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
        const rawValue = this.form.getRawValue();
        if (!rawValue.fEntrega) {
            this._fuseSplashScreenService.show();
            this._messageProviderService.showSnackError('Dato requerido: Debe seleccionar fecha de entrega');
            this._fuseSplashScreenService.hide();
            return;
        }
        const date = moment(this.form.controls.fEntrega.value).format('DD-MM-YYYY');
        const operator = this.operator.id;
        const nameOperator = `${this.operator.firstName} ${this.operator.lastName}`;
        const workload = this.codLoad;
        const dateLimit = moment(this.form.controls.fEntrega.value).format('DD-MM-YYYY');
        const ubigeo = this._currentUserUbigeo;
        this._messageProviderService.showConfirm('Esta seguro de asignar la carga al operador ' + nameOperator)
            .afterClosed()
            .subscribe(async (confirm) => {
                this._fuseSplashScreenService.show();
                if (confirm){
                    await this._tableService.assigmentOperator(operator, nameOperator, workload, dateLimit, ubigeo)
                    .then(async (result) => {
                        //this._tableService._updateTable.next(true);
                        await this._messageProviderService.showAlert('Asignado correctamente');
                        this.form.reset();
                        this.redirecto();
                        //window.location.reload();
                        this._fuseSplashScreenService.hide();
                    })
                    .catch((error) => {
                        this._messageProviderService.showSnackError('Error al asignar carga');
                        window.location.reload();
                    });
                }
                this._fuseSplashScreenService.hide();
            });

    }


}
