import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableActions } from '../../../shared/interfaces/table-actions.interface';
import { TableAction } from '../../../shared/enum/table-action.enum';
import { Router } from '@angular/router';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';

@Component({
  selector: 'app-assign-load',
  templateUrl: './assign-load.component.html',
  styleUrls: ['./assign-load.component.scss']
})
export class AssignLoadComponent implements OnInit {

    user: boolean = true;
    tableConfig: TableConifg = {
        isAction: true,
        isZoom: true,
        isSelect: true,

    };
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
  constructor(private _router: Router) { }

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
    redirecto(): void {
        this._router.navigate(['/inspection/assignment-of-load']);
    }

    onSelect(data: any): void {
        console.log('select', data);
    }
}

