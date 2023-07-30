import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../interfaces/table-columns.interface';
import { Router } from '@angular/router';
import { TableConifg } from '../../interfaces/table-config.interface';

@Component({
    selector: 'app-load-pending-assignment',
    templateUrl: './load-pending-assignment.component.html',
    styleUrls: ['./load-pending-assignment.component.scss'],
})
export class LoadPendingAssignmentComponent implements OnInit {
    tableColumns: TableColumn[] = [];
    dataSource = [
        { nro: '01', sector: '1', mzurb: 'A', tipo: 'CF' },
        { nro: '01', sector: '1', mzurb: 'A', tipo: 'CF' },
        { nro: '01', sector: '1', mzurb: 'A', tipo: 'CF' },
        { nro: '01', sector: '1', mzurb: 'A', tipo: 'CF' },
    ];

    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
    };

    user: boolean = true;

    cards = [
        {
            num: 21,
            text: 'MANZANAS ASIGNADAS ACTUALMENTE',
        },
        {
            num: 25,
            text: 'TICKETS ATENDIDOS',
        },
    ];

    constructor(private _router: Router) {}

    ngOnInit(): void {
        this.setTableColumn();
    }

    setTableColumn(): void {
        this.tableColumns = [
            { matheaderdef: 'Nro', matcolumndef: 'nro', matcelldef: 'nro' },
            {
                matheaderdef: 'Sector',
                matcolumndef: 'sector',
                matcelldef: 'sector',
            },
            {
                matheaderdef: 'Mz.Urb.',
                matcolumndef: 'mzurb',
                matcelldef: 'mzurb',
            },
            { matheaderdef: 'Tipo', matcolumndef: 'tipo', matcelldef: 'tipo' },
        ];
    }

    //   Implementar logica
    onZoom(row: any): void {
        console.log('zoom');
    }

    redirecto(): void {
        this._router.navigate(['./mapping/assignment-of-load']);
    }
}
