import { environment } from './../../../../../../../environments/environment';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TableActions } from '../../../shared/interfaces/table-actions.interface';
import { TableAction } from '../../../shared/enum/table-action.enum';
import { MatDialogDeletedComponent } from '../alert-confirm/mat-dialog-deleted.component';



import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { TableService } from '../../services/table.service';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { MatPaginator } from '@angular/material/paginator';
import { OperatorService } from '../../services/operator.service';

@Component({
    selector: 'app-table-pending',
    templateUrl: './table-pending.component.html',
    styleUrls: ['./table-pending.component.scss']
})
export class TablePendingComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    bySearch: any;
    tableColumns: TableColumn[] = [];
    tableConfig: TableConifg = {
        isAction: true,
        isEdit: true,
        isDeleted: true,
    };

    _currentUserUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();
    dataSource = [];
    count = 0;
    params = { limit: 10, offset: 0 };
    error: boolean = false;
    constructor(
        public dialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageProvider: MessageProviderService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _tableService: TableService,
        private _userService: UserService,
        private _operatorService: OperatorService,
    ) { }

    ngOnInit(): void {
        this.setTableColumn();
        this._operatorService.getUbigeo().subscribe((data) => {
            this._currentUserUbigeo = data;
            setTimeout(() => {
                this.loadTable();
            }, 1000);
        });

    }

    ngAfterViewInit(): void {
        this._tableService.searchBy.subscribe((res) => {
            this.bySearch = res;
            this.loadTable();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    setTableColumn(): void {
        this.tableColumns = [
            { matheaderdef: 'Nro.', matcolumndef: 'nro', matcelldef: 'nro' },
            { matheaderdef: 'Cod. Carga', matcolumndef: 'codCarga', matcelldef: 'codCarga' },
            //{matheaderdef:'Fecha', matcolumndef:'fecha', matcelldef: 'fecha'},
        ];

    }

    onAction(tableAction: TableActions): void {
        switch (tableAction.action) {
            case TableAction.edit:
                this.onEditAssigned(tableAction.row);
                break;

            case TableAction.delete:
                this.onDelete(tableAction.row);
                break;

            default:
                break;
        }
    };

    onEditAssigned(row): void {
        this._router.navigate([`pending/${row.codCarga}`], { relativeTo: this._activatedRoute });
    }


    onDelete(row): void {
        const cod = row.codCarga;
        this._messageProvider.showConfirm('Esta seguro de eliminar el codigo de carga: ' + cod)
            .afterClosed()
            .subscribe(async (confirm) => {
                this._fuseSplashScreenService.show();
                if (confirm) {
                    await this._tableService.deleteRow(row, this._currentUserUbigeo)
                        .then((data) => {
                            this._tableService.reloadLayersAfterDelete();
                            this._messageProvider.showAlert(data);
                            this.loadTable();
                            this._fuseSplashScreenService.hide();
                        })
                        .catch(error => this._messageProvider.showSnackError(error));
                    this._fuseSplashScreenService.hide();
                }
                this._fuseSplashScreenService.hide();
            });

    }

    async loadTable(): Promise<void> {
        this._fuseSplashScreenService.show();
        const queryData = 'ESTADO = "1"';
        const fieldsDataLoad = ['OBJECTID', 'ID_CARGA', 'COD_CARGA', 'FEC_ENTREGA'];

        this.count = await this._tableService.dataCount(queryData, this._currentUserUbigeo, this.bySearch);
        this.dataSource = await this._tableService.dataLoad(queryData, fieldsDataLoad, this._currentUserUbigeo, this.bySearch, this.params);

        if (this.dataSource.length > 0) {
            this.error = false;
        } else {
            this.error = true;
        }

        this._fuseSplashScreenService.hide();
    }

    page(e): void {
        this.params['limit'] = e.pageSize;
        this.params['offset'] = e.pageSize * e.pageIndex;
        this.loadTable();
    }

}

