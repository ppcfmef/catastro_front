import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-gap-analysis-block-list',
    templateUrl: './gap-analysis-block-list.component.html',
    styleUrls: ['./gap-analysis-block-list.component.scss'],
})
export class GapAnalysisBlockListComponent implements OnInit {
    @Input() view;
    @Input() length: number;
    @Input() tableColumns: TableColumn[] = [];
    @Input() dataSource = [
        /*{ nro: '01', estado: '1', mzurb: 'A', tipo: '5' },
        { nro: '02', estado: '1', mzurb: 'Z1', tipo: '7' },
        { nro: '03', estado: '3', mzurb: 'P', tipo: '1' },
        { nro: '04', estado: '12', mzurb: 'Z1', tipo: '1' },*/
    ];

    @Input() cards = [
        {
            num: 21,
            text: 'PREDIOS PARA VERIFICACION EN CAMPO',
        },
        {
            num: 21,
            text: 'PREDIOS EN TRABAJO DE CAMPO',
        },
    ];
    @Input() tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
    };
    @Output() zoomAction: EventEmitter<any> = new EventEmitter();
    @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
    @Output() refreshPage: EventEmitter<any> = new EventEmitter();
    pageIndex = 0;
    pageSize = 5;
    pageSizeOptions = [1, 5, 10, 25, 50, 100, 250, 500];

    constructor() {
        /*this.setTableColumn();*/
    }

    ngOnInit(): void {}

    onZoom(element: any): void {
        this.zoomAction.emit(element.row);
    }

    onPage(paginator: MatPaginator): void {
        this.pageIndex = paginator.pageIndex;
        console.log('paginator>>',paginator);
        this.changePage.emit(paginator);
      }
      onRefreshPage(): void {
        this.refreshPage.emit();
      }

}
