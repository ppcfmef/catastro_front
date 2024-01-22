import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { TableActions } from '../../../shared/interfaces/table-actions.interface';
import { TableAction } from '../../../shared/enum/table-action.enum';

import { ActivatedRoute, Router } from '@angular/router';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { Subject } from 'rxjs';
import { IdataLoad } from '../../interfaces/dataload.interface';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { TableService } from '../../services/table.service';
import { OperatorService } from '../../services/operator.service';

@Component({
    selector: 'app-table-assigned',
    templateUrl: './table-assigned.component.html',
    styleUrls: ['./table-assigned.component.scss'],
})
export class TableAssignedComponent implements OnInit, AfterViewInit, OnDestroy {
    tableColumns: TableColumn[] = [];
    tableConfig: TableConifg = {
        isAction: true,
        isEdit: true,
        isDeleted: true,
    };
    dataSource: [];
    _unsubscribeAll: Subject<any> = new Subject<any>();
    _currentUserUbigeo: string;
    error: boolean = false;
    bySearch: any;
    count = 0;
    params = { limit: 5, offset: 0 };


    constructor(
        public dialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageProvider: MessageProviderService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        protected _tableService: TableService,
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
        setTimeout(() => {
            this.loadTable();
        }, 1000);
        this._tableService.searchBy.subscribe((res) => {
            this.bySearch = res;
            this.loadTable();
        });
        this._tableService._updateTable.subscribe((resp) => {
            if (resp) {
                this.loadTable();
            }
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
            { matheaderdef: 'Operador', matcolumndef: 'operador', matcelldef: 'operador' },
            { matheaderdef: 'Fecha', matcolumndef: 'fecha', matcelldef: 'fecha', },
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
    }

    onEditAssigned(row): void {
        this._router.navigate([`load-assigned/${row.codCarga}`], { relativeTo: this._activatedRoute });
    }
    onDelete(row): void {
        const cod = row.codCarga;

        const messageDelete = `¿Está seguro de eliminar el la carga de trabajo: ${cod}?`;
        const messageDeletePending = `No se puede eliminar la carga ${cod} porque contiene tickets resueltos. 
        ¿Desea eliminar los tickets pendientes para su reasignación en una nueva carga de trabajo?`;
        const messageDeleteSuccess = `La carga de trabajo con código ${cod} ha sido eliminada`;
        const messageDeletePendingSuccess = `Se eliminaron los tickets pendientes de la carga de trabajo ${cod}`;

        // Check if the workload has attended tickets
        this._tableService.hasAttendedTickets(cod, this._currentUserUbigeo).then(async (hasAttendedTickets) => {
            let confirm = true;

            if (hasAttendedTickets) {
                confirm = await this._messageProvider.showConfirm(messageDeletePending).afterClosed().toPromise();
            } else {
                confirm = await this._messageProvider.showConfirm(messageDelete).afterClosed().toPromise();
            }

            if (confirm) {
                this._fuseSplashScreenService.show();
                try {
                    if (hasAttendedTickets) {
                        await this._tableService.deletePendingTickets(cod, this._currentUserUbigeo)
                            .then(() => {
                                this._tableService.reloadLayersAfterDelete();
                                this._messageProvider.showAlert(messageDeletePendingSuccess);
                            });
                    }
                    else {
                        await this._tableService.deleteRow(row, this._currentUserUbigeo)
                            .then(() => {
                                this._tableService.reloadLayersAfterDelete();
                                this._messageProvider.showAlert(messageDeleteSuccess);
                            });
                    }
                    this.loadTable();
                    this._tableService.reloadTableAttended.emit();
                    // this._tableService.triggerReloadTableAttended();
                } catch (error) {
                    this._messageProvider.showSnackError(error);
                } finally {
                    this._fuseSplashScreenService.hide();
                }
            }
        });

    }

    async loadTable(): Promise<void> {
        const queryData = 'ESTADO IN ("2","3")';
        const fieldsDataLoad = ['OBJECTID', 'ID_CARGA', 'COD_CARGA', 'FEC_ENTREGA', 'COD_USUARIO', 'NOM_USUARIO'];

        this.count = await this._tableService.dataCount(queryData, this._currentUserUbigeo, this.bySearch);
        this.dataSource = await this._tableService.dataLoad(queryData, fieldsDataLoad, this._currentUserUbigeo, this.bySearch, this.params);

        if (this.dataSource.length > 0) {
            this.error = false;
        } else {
            this.error = true;
        }
    }

    page(e): void {
        this.params['limit'] = e.pageSize;
        this.params['offset'] = e.pageSize * e.pageIndex;
        this.loadTable();
    }
}

