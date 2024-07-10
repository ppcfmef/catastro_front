import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';

@Component({
    selector: 'app-table-synchronizations-processed',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        FuseScrollbarModule
    ],
    templateUrl: './table-synchronizations-processed.component.html',
    styleUrls: ['./table-synchronizations-processed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSynchronizationsProcessedComponent  implements OnChanges  , OnInit{

    @Input() dataSource: any[];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    tableDataSource;
    pageIndex = 0;
    pageSize = 10;
    displayedColumns: string[] = ['Nro','codigoDeclaracionJurada', 'codigoPredio', 'codigoContribuyente', 'falloDescripcion','secuenciaEjecutora', 'fecha', 'estado'];
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }


    ngOnInit(): void {
        console.log(this.dataSource);
       this.tableDataSource = new MatTableDataSource(this.dataSource);
    }

    ngOnChanges(changes: SimpleChanges): void {

        this.tableDataSource = new MatTableDataSource(this.dataSource);

    }
 }
