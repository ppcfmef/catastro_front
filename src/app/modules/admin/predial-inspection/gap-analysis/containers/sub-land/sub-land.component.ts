import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-land',
  templateUrl: './sub-land.component.html',
  styleUrls: ['./sub-land.component.scss']
})
export class SubLandComponent implements OnInit {
    tableColumns: TableColumn[] =[];
    dataSource = [
        { nro: '01', estado: '1', mzurb:'A', tipo: '5' },
        { nro: '02', estado: '1', mzurb:'Z1', tipo: '7' },
        { nro: '03', estado: '3', mzurb:'P', tipo: '1' },
        { nro: '04', estado: '12', mzurb:'Z1', tipo: '1' },
    ];

    cards =[
        {
            num: 21,
            text: 'PREDIOS PARA VERIFICACION EN CAMPO'
        },
        {
            num: 21,
            text: 'PREDIOS EN TRABAJO DE CAMPO'
        }
    ];

    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
    };
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.setTableColumn();
  }
  setTableColumn(): void {
    this.tableColumns = [
        {matheaderdef:'Nro', matcolumndef:'nro', matcelldef: 'nro'},
        {matheaderdef:'Mz.Urb.', matcolumndef:'mzurb', matcelldef: 'mzurb'},
        {matheaderdef:'Sub', matcolumndef:'tipo', matcelldef: 'tipo'},
        {matheaderdef:'Estado', matcolumndef:'estado', matcelldef: 'estado'}
    ];
    }


    onZoom(row: any): void {
        console.log('zoom',);
    }


}
