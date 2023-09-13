import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { TableActions } from '../../../shared/interfaces/table-actions.interface';
import { TableAction } from '../../../shared/enum/table-action.enum';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { Subject } from 'rxjs';
import { IdataLoad } from '../../interfaces/dataload.interface';
import { MatTableDataSource } from '@angular/material/table';
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
    _portalUrl = 'https://js.arcgis.com/4.27/';
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
            this.loadTable();
        });
    }

    ngAfterViewInit(): void {
        this.loadTable();
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
        this._unsubscribeAll.next();
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
        this._messageProvider.showConfirm('Esta seguro de eliminar el codigo de carga: ' + cod)
            .afterClosed()
            .subscribe(async (confirm) => {
                this._fuseSplashScreenService.show(0);
                if (confirm) {
                    await this._tableService.deleteRow(row, this._currentUserUbigeo)
                        .then((data) => {
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

        // Agregar un setTimeout para retrasar la llamada a dataCount
        setTimeout(async () => {
            await this._tableService.dataCount('ESTADO IN ("2","3")', this._currentUserUbigeo, this.bySearch).then((count) => {
                this.count = count;
            });

            // Agregar otro setTimeout para retrasar la llamada a dataLoad
            setTimeout(async () => {
                await this._tableService.dataLoad('ESTADO IN ("2","3")', ['OBJECTID', 'ID_CARGA', 'COD_CARGA', 'FEC_ENTREGA', 'COD_USUARIO', 'NOM_USUARIO'],
                    this._currentUserUbigeo, this.bySearch, this.params).then((data) => {
                        this.dataSource = data;
                        if (this.dataSource.length > 0) {
                            this.error = false;
                        } else {
                            this.error = true;
                        }

                        // Ocultar el SplashScreen después de que se completen las llamadas
                        this._fuseSplashScreenService.hide();
                    });
            }, 1000); // Esperar 1 segundo antes de llamar a dataLoad
        }, 1000); // Esperar 1 segundo antes de llamar a dataCount
    }

    page(e): void {
        this.params['limit'] = e.pageSize;
        this.params['offset'] = e.pageSize * e.pageIndex;
        this.loadTable();
    }
}

