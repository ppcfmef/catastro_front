import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { takeUntil } from 'rxjs/operators';
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
    operator;
    form: FormGroup;

     // Properties table
    tableColumns: TableColumn[] = [];
    dataSource = [];
    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
    };

    // Properties widget
    user: boolean = false;
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
                operator: new FormControl(),
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

    }

    ngAfterViewInit(): void {
        this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe(({cod}) => {
            if (cod) {
                this.user = true;
                [this.newCod , this.codOperator] = cod.split('-');
                this._tableService.detailLoad(this.newCod, this._currentUserUbigeo).then(data => this.dataSource = data);
                    this._operatorsService.getOperatorById(this.codOperator).subscribe(data => this.operator = data);
                    this._widgetService.widgetUser(this._currentUserUbigeo , this.codOperator).then(({attended ,pending }) => {
                        this.cards[0].num = pending;
                        this.cards[1].num = attended;
                    });

                this._tableService.fechaLoad(this.newCod,this._currentUserUbigeo).then((res) => {
                    const formatDate = new Date(res);
                    this.form.controls.fEntrega.setValue(formatDate);
                });
            }
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
        await this._tableService.assigmentOperator(operator, nameOperator, workload, dateLimit, ubigeo);
        this.user = true;
        this.form.controls['codUser'].enable();
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

}
