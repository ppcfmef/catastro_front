import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { TableService } from '../../services/table.service';
import { OperatorService } from '../../services/operator.service';
import { WidgetService } from '../../services/widget.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import moment from 'moment';
import { debounce } from 'lodash';
import { IOperator, IResult } from '../../interfaces/operator.interface';
import { T } from '@angular/cdk/keycodes';



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
    newCod;
    codOperator;
    operator: IOperator;
    form: FormGroup;

     // Properties table
    tableColumns: TableColumn[] = [];
    dataSource = [];
    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
    };
    // eslint-disable-next-line @typescript-eslint/naming-convention
    params = {is_active: true, isMobileStaff:true };
    // Properties widget
    user: boolean = true;
    codLoad: string;

    cards = [
        {
            num: 0,
            text: 'TICKETS ASIGNADAS ACTUALMENTE',
        },
        {
            num: 0,
            text: 'TICKETS ATENDIDOS',
        },
    ];

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _userService: UserService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _tableService: TableService,
        private _operatorsService: OperatorService,
        private _widgetService: WidgetService,
        protected _messageProviderService: MessageProviderService,
        ) {
            this.form = new FormGroup ({
                fEntrega: new FormControl(),
                codUser: new FormControl(''),
            });
        }

    ngOnInit(): void {
        this.setTableColumn();
        this._userService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: User) => {
            this._currentUserUbigeo = user.ubigeo ? user.ubigeo : '040703';
        });

        // this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe(({cod}) => {
        //     if (cod) {
        //         this.codLoad = cod;
        //         this._tableService.detailLoad(cod, this._currentUserUbigeo).then(data => this.dataSource = data);
        //     }
        // });
        this.getdataUser();
    }

    ngAfterViewInit(): void {
        this.form.controls['codUser'].valueChanges.
            pipe(debounceTime(600),
                takeUntil(this._unsubscribeAll))
            .subscribe((dni: any) => {
                if(!dni){
                    this.operator = null;
                    this.cards[0].num =0;
                    this.cards[1].num = 0;
                    return;
                }else {
                    this.params['search'] = dni;
                    console.log(this.params, '');
                    this.user = false;
                    this.getOperator();
                }
            });
    }


    async getOperator(): Promise<any> {
        await this._operatorsService.getOperador(this.params).subscribe(async (data: IResult) => {
            this._fuseSplashScreenService.show();
            this.operator = data.results[0];
            if(this.operator){
                await this._widgetService.widgetUser(this._currentUserUbigeo , this.operator.id).then(({attended ,pending }) => {
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

    getdataUser(): void {
        this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe(({cod}) => {
            if (cod) {
                this.newCod = cod;
                this._tableService.detailLoad(cod, this._currentUserUbigeo).then(data => this.dataSource = data);
                this._tableService.getDataByWorkLoad(this._currentUserUbigeo,cod).then((resp) => {
                    const formatDate = new Date(resp.dateLimit);
                    this.form.controls.fEntrega.setValue(formatDate);
                    this.operator = resp.user;
                    this.cards[0].num =resp.user.statsUser.pending;
                    this.cards[1].num = resp.user.statsUser.attended;
                });
            }
        });
    }

    getWidgetByUser(id): void {
        this._widgetService.widgetUser(this._currentUserUbigeo,id).then((resp) => {
            this.cards[0].num =resp.pending;
            this.cards[1].num = resp.attended;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    async desasignar(): Promise<void> {
        const dateLimit = null;
        const nameOperator = null;
        const ubigeo = this._currentUserUbigeo;
        const workload = this.newCod;
        const operator = null;
        await this._tableService.assigmentOperator(operator, nameOperator, workload, dateLimit, ubigeo)
        .then(() => {
            this.user = false;
            this.form.controls['codUser'].enable();
            this.operator = null;
        })
        .catch();

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
        await this._tableService.zoomRow(row).then(data =>  console.log(data));
    }

    async assigment(): Promise<void> {
        this._fuseSplashScreenService.show(0);
        const rawValue = this.form.getRawValue();
        if (!rawValue.fEntrega) {
            this._messageProviderService.showSnackError('debe seleccionar fecha de entrega');
            this._fuseSplashScreenService.hide();
            return;
        }
        const operator = this.operator.id;
        const nameOperator = `${this.operator.firstName} ${this.operator.lastName}`;
        const workload = this.newCod;
        const dateLimit = moment(this.form.controls.fEntrega.value).format('DD-MM-YYYY');
        const ubigeo = this._currentUserUbigeo;
        await this._tableService.assigmentOperator(operator, nameOperator, workload, dateLimit, ubigeo)
            .then((result) =>{
                console.log(result, 'result');
                this._messageProviderService.showSnack('Asignado correctament');
                window.location.reload();
                this._fuseSplashScreenService.hide();
            })
            .catch((error)=> {
                console.log(error, 'errr');
                this._messageProviderService.showSnackError('Error al asignar carga');
                this._fuseSplashScreenService.hide();
            });

    }

}
