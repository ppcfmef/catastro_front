import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../interfaces/table-columns.interface';
import { Router } from '@angular/router';
import { TableConifg } from '../../interfaces/table-config.interface';

@Component({
  selector: 'app-load-attend',
  templateUrl: './load-attend.component.html',
  styleUrls: ['./load-attend.component.scss']
})
export class LoadAttendComponent implements OnInit {

    tableColumns: TableColumn[] =[];
    tableConfig: TableConifg = {
        isAction: true,
        isZoom:true,
    };
    dataSource = [
        { nro: '01', sector: '1', mzurb:'A', tipo: 'CF' },
        { nro: '02', sector: '1', mzurb:'A', tipo: 'CF' },
        { nro: '03', sector: '2', mzurb:'A', tipo: 'CF' },
        { nro: '04', sector: '4', mzurb:'P', tipo: 'EU' },
        { nro: '05', sector: '4', mzurb:'A', tipo: 'CF' },
        { nro: '06', sector: '5', mzurb:'A', tipo: 'EU' },
    ];

    cards =[
        {
            num: 21,
            text: 'MANZANAS ASIGNADAS ACTUALMENTE'
        },
        {
            num: 25,
            text: 'TICKETS ATENDIDOS'
        }
    ];

  constructor( private _router: Router) { }

  ngOnInit( ): void {
    this.setTableColumn();
  }

  setTableColumn(): void {
    this.tableColumns = [
        {matheaderdef:'Nro', matcolumndef:'nro', matcelldef: 'nro'},
        {matheaderdef:'Sector', matcolumndef:'sector', matcelldef: 'sector'},
        {matheaderdef:'Mz.Urb.', matcolumndef:'mzurb', matcelldef: 'mzurb'},
        {matheaderdef:'Tipo', matcolumndef:'tipo', matcelldef: 'tipo'},
    ];
    }

    onZoom(row: any): void {
        //
    }

    redirecto(): void {
        this._router.navigate(['./mapping/assignment-of-load']);
    }

}
