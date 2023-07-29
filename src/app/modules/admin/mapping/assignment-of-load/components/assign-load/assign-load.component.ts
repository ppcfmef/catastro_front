import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../interfaces/table-columns.interface';
import { TableActions } from '../../interfaces/table-actions.interface';
import { TableAction } from '../../enum/table-action.enum';

@Component({
  selector: 'app-assign-load',
  templateUrl: './assign-load.component.html',
  styleUrls: ['./assign-load.component.scss']
})
export class AssignLoadComponent implements OnInit {

    user: boolean = true;

    tableColumns: TableColumn[] =[];
    dataSource = [
        { nro: '01', sector: '1', mzurb:'A', tipo: 'CF' },
        { nro: '02', sector: '1', mzurb:'Z1', tipo: 'CF' },
        { nro: '03', sector: '3', mzurb:'P', tipo: 'EU' },
        { nro: '04', sector: '12', mzurb:'Z1', tipo: 'EU' },
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
  constructor() { }

  ngOnInit(): void {
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


  //   Implementar logica
onZoom(row: any): void {
    console.log('zoom',);
}



}
