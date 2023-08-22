/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';





@Component({
    selector: 'app-load-assigned',
    templateUrl: './load-assigned.component.html',
    styleUrls: ['./load-assigned.component.scss'],
})
export class LoadAssignedComponent implements OnInit, AfterViewInit {


     // Properties table
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

    // Properties widget
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

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,

        ) {}

    ngOnInit(): void {
        this.setTableColumn();

    }

    ngAfterViewInit(): void {
        // this.dataAssigned(this._currentUserUbigeo);
    }

    desasignar(): void {
        this.user = false;
    }

    setTableColumn(): void {
        this.tableColumns = [
            { matheaderdef: 'Nro', matcolumndef: 'nro', matcelldef: 'nro'},
            { matheaderdef: 'Sector',matcolumndef: 'sector',matcelldef: 'sector'},
            { matheaderdef: 'Mz.Urb.', matcolumndef: 'mzurb',matcelldef: 'mzurb'},
            { matheaderdef: 'Tipo', matcolumndef: 'tipo', matcelldef: 'tipo' },
        ];
    }


    onZoom(row: any): void {
        console.log('zoom');
    }

    redirecto(): void {
        this._router.navigate(['../../'], {relativeTo: this._route});
    }

}
