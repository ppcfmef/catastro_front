import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DJ } from '../../interfaces/dj.interface';
import { elementAt } from 'rxjs';
import { SynchronizationDjService } from '../../services/synchronization-dj.service';

@Component({
    selector: 'app-table-synchronizations-processed',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        FuseScrollbarModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    templateUrl: './table-synchronizations-processed.component.html',
    styleUrls: ['./table-synchronizations-processed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSynchronizationsProcessedComponent  implements OnInit, OnChanges, AfterViewInit {


    @Input() tableDataSource;
    @Input() length: number;
    @Output() paginatorChange = new EventEmitter<any>();
    @Output() rowClick = new EventEmitter<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    pageIndex: number= 0;
    pageSize: number= 10;
    dataSource = new MatTableDataSource<DJ>();
    displayedColumns: string[] = ['Nro','codigoDeclaracionJurada', 'codigoContribuyente', 'falloDescripcion','secuenciaEjecutora', 'fecha', 'estado','actions'];
    #changeDetectorRef = inject(ChangeDetectorRef);
    synchronizationDjService = inject(SynchronizationDjService);


    ngOnInit(): void {
        this.dataSource.data = this.tableDataSource;
        this.dataSource.paginator = this.paginator;
        this.#changeDetectorRef.detectChanges();


        this.synchronizationDjService.params$.subscribe((params) => {
            this.pageIndex = params.pageIndex ??  this.pageIndex;
            this.pageSize = params.pageSize ??  this.pageSize;
        });
    }


    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        // this.paginator.length = this.length;
        // this.#changeDetectorRef.detectChanges();
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tableDataSource) {
            this.dataSource.data = this.tableDataSource || [];
        }

        if (changes.length && this.paginator) {
            this.paginator.length = this.length;
            this.#changeDetectorRef.detectChanges();
        }

    }
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    onPageChange(event: any): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        event.pageIndex+=1;
        this.paginatorChange.emit({
            pageIndex: event.pageIndex,
            pageSize: event.pageSize
        });
    }


    onAction(element): void {
        this.rowClick.emit(element);
    }
}
