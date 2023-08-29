/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { MatTableDataSource } from '@angular/material/table';
import { IdataLoad } from '../../interfaces/dataload.interface';
import { TableActions } from '../../../shared/interfaces/table-actions.interface';
import { TableAction } from '../../../shared/enum/table-action.enum';
import { NewLoadService } from '../../services/new-load.service';

@Component({
    selector: 'app-new-load',
    templateUrl: './new-load.component.html',
    styleUrls: ['./new-load.component.scss']
})
export class NewLoadComponent implements OnInit, AfterViewInit, OnDestroy {

    _unsubscribeAll: Subject<any> = new Subject<any>();
    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
        isDeleted: true,

    };
    tableColumns: TableColumn[] = [];
    dataSource: MatTableDataSource<IdataLoad>;
    data: IdataLoad[] = [];

    constructor(
        private _newLoadService: NewLoadService,
    ) { }


    ngOnInit(): void {
        this.setTableColumn();
        this._newLoadService.deleteAllGraphicsMap.subscribe((state: boolean) => {
            if (state) {
                this.data.splice(0, this.data.length);
                this.dataSource = new MatTableDataSource(this.data);
                state = false;
            }
            this._newLoadService.setTableData(this.data);
        });

        this._newLoadService.dataMap.subscribe((dataMap: IdataLoad[]) => {
            // row is an array
            for (const item of dataMap) {
                if (item.status === 1) {
                    this.data = [...this.data, item];
                }
                else {
                    this.deleteItem(this.data, item);
                }
                this.addkey(this.data);
                this.dataSource = new MatTableDataSource(this.data);
            }
            this._newLoadService.setTableData(this.data);
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

    onAction(tableAction: TableActions): void {
        switch (tableAction.action) {
            case TableAction.zoom:
            this.onZoom(tableAction.row);
            break;

            case TableAction.delete:
            this.onDelete(tableAction.row);
            break;

            default:
                break;
        }
    }

    //   Implementar logica
    onZoom(row: any): void {
        console.log('zoom',);
    }

    onDelete(row: IdataLoad): void {
        this.deleteItem(this.data, row);
        this.dataSource = new MatTableDataSource(this.data);
        this.addkey(this.data);
        this._newLoadService.oid.next(row.oid);
    }

    addkey(data: IdataLoad[]): void {
        data.map((item, index) => {
            Object.assign(item, {nro: `${index+1}`});
        });
    }

    deleteItem(dataItem: IdataLoad[], row: IdataLoad): void {
        const index = dataItem.findIndex((data: IdataLoad) => data.codigo === row.codigo);
        if (index === -1) {return;}
        this.data.splice(index, 1);
    }
}
