import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { TableService } from '../../services/table.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
@Component({
  selector: 'app-table-attended',
  templateUrl: './table-attended.component.html',
  styleUrls: ['./table-attended.component.scss']
})
export class TableAttendedComponent implements OnInit,AfterViewInit,OnDestroy {

    tableColumns: TableColumn[] =[];
    tableConfig: TableConifg = {
        isAction: true,
        isEdit: true,
    };

    dataSource = [];
    _unsubscribeAll: Subject<any> = new Subject<any>();
    _currentUserUbigeo: string;
    error: boolean = false;
    bySearch: any;
    count=0;
    params = { limit: 5, offset: 0 };

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _tableService: TableService,
        private _userService: UserService,
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
        this.loadTable();
        this._tableService.searchBy.subscribe((res) => {
            this.bySearch = res;
            this.loadTable();
        });
    }

    setTableColumn(): void {
        this.tableColumns = [
            {matheaderdef:'Nro.', matcolumndef:'nro', matcelldef: 'nro'},
            {matheaderdef:'Cod. Carga', matcolumndef:'codCarga', matcelldef: 'codCarga'},
            {matheaderdef:'Operador', matcolumndef:'operador', matcelldef: 'operador'},
            {matheaderdef:'Fecha', matcolumndef:'fecha', matcelldef: 'fecha'},
        ];

    }

    async loadTable(): Promise<void> {
        this._fuseSplashScreenService.show();
        await this._tableService.dataCount('ESTADO = "4"', this._currentUserUbigeo, this.bySearch).then((count) => {
            this.count = count;
        })
            .then(() => this._tableService.dataLoad('ESTADO = "4"', ['OBJECTID', 'ID_CARGA', 'COD_CARGA', 'FEC_ENTREGA', 'COD_USUARIO', 'NOM_USUARIO'],
                this._currentUserUbigeo, this.bySearch, this.params)
            )
            .then((data) => {
                this.dataSource = data;
                if (this.dataSource.length > 0) {
                    this.error = false;
                } else {
                    this.error = true;
                }
            });
        this._fuseSplashScreenService.hide();

    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onEdit({row}): void {
        this._tableService._row.next(row);
        this._router.navigate([`load-attend/${row.codCarga}`], {relativeTo: this._activatedRoute});
    }
    page(e): void {
        this.params['limit'] = e.pageSize;
        this.params['offset'] = e.pageSize * e.pageIndex;
        this.loadTable();
    }

}

