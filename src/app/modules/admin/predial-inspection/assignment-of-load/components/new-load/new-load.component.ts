/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, Renderer2 } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { loadModules } from 'esri-loader';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StateService } from '../../services/state.service';
import { IdataLoad } from '../../interfaces/dataload.interface';

@Component({
    selector: 'app-new-load',
    templateUrl: './new-load.component.html',
    styleUrls: ['./new-load.component.scss']
})
export class NewLoadComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    count = 0;

    _portalUrl = 'https://js.arcgis.com/4.27/';

    _queryUbigeo: string;
    _field_ubigeo = 'UBIGEO';



    // Properties app
    _currentUser: User;
    _currentUserUbigeo: string;
    _unsubscribeAll: Subject<any> = new Subject<any>();

    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,

    };
    tableColumns: TableColumn[] = [];

    dataSource: MatTableDataSource<IdataLoad>;
    data: IdataLoad[] = [];
    constructor(
        private _stateService: StateService,
        private cdr: ChangeDetectorRef
    ) { }


    ngOnInit(): void {
        this.setTableColumn();
        this._stateService.deleteAll.subscribe((state:boolean) => {
            if (state) {
                this.data.splice(0, this.data.length);
                this.dataSource = new MatTableDataSource(this.data);
                state = false;
            }
            this._stateService.setTableData(this.data);
        });

        this._stateService.row.subscribe((row: IdataLoad[]) => {
            // row is an array
            for (const item of row) {
                if (item.status === 1) {
                    this.data = [...this.data, item];
                }
                else {
                    const index = this.data.findIndex((data:IdataLoad) => data.codigo === item.codigo);
                    if (index === -1) return;
                    this.data.splice(index, 1);
                }
                this.data.map((item, index) => {
                    Object.assign(item, {nro: `${index+1}`});
                });

                this.dataSource = new MatTableDataSource(this.data);
            }
            this._stateService.setTableData(this.data);
        });
    }


    ngAfterViewInit(): void {
    };

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    setTableColumn(): void {
        this.tableColumns = [
            { matheaderdef: 'Nro', matcolumndef: 'nro', matcelldef: 'nro' },
            { matheaderdef: 'Codigo', matcolumndef: 'codigo', matcelldef: 'codigo' },
            { matheaderdef: 'Tipo', matcolumndef: 'tipo', matcelldef: 'tipo' },
            { matheaderdef: 'Fuente', matcolumndef: 'fuente', matcelldef: 'fuente' },
        ];
    }

    //   Implementar logica
    onZoom(row: any): void {
        console.log('zoom',);
    }


}
