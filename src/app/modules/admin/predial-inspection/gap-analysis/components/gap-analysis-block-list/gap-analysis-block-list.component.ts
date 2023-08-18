import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';

@Component({
    selector: 'app-gap-analysis-block-list',
    templateUrl: './gap-analysis-block-list.component.html',
    styleUrls: ['./gap-analysis-block-list.component.scss'],
})
export class GapAnalysisBlockListComponent implements OnInit {
    @Input() tableColumns: TableColumn[] = [];
    @Input() dataSource = [
        { nro: '01', estado: '1', mzurb: 'A', tipo: '5' },
        { nro: '02', estado: '1', mzurb: 'Z1', tipo: '7' },
        { nro: '03', estado: '3', mzurb: 'P', tipo: '1' },
        { nro: '04', estado: '12', mzurb: 'Z1', tipo: '1' },
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

    constructor() {
        this.setTableColumn();
    }

    ngOnInit(): void {}

    setTableColumn(): void {
        this.tableColumns = [
            { matheaderdef: 'Nro', matcolumndef: 'nro', matcelldef: 'nro' },
            {
                matheaderdef: 'Mz.Urb.',
                matcolumndef: 'mzurb',
                matcelldef: 'mzurb',
            },
            { matheaderdef: 'Sub', matcolumndef: 'tipo', matcelldef: 'tipo' },
            {
                matheaderdef: 'Estado',
                matcolumndef: 'estado',
                matcelldef: 'estado',
            },
        ];
    }

    onZoom(row: any): void {
        console.log('zoom');
    }
}
