import { Component, OnInit } from '@angular/core';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.scss']
})
export class ImagenComponent implements OnInit {
    tableColumns: TableColumn[] =[];
    dataSource = [
        { nro: '01', sector: '1', mzurb:'A', tipo: '5' },
        { nro: '02', sector: '1', mzurb:'Z1', tipo: '7' },
        { nro: '03', sector: '3', mzurb:'P', tipo: '1' },
        { nro: '04', sector: '12', mzurb:'Z1', tipo: '1' },
    ];

    card ={
            num: 21,
            text: 'MANZANAS CON PUNTO IMAGEN'
        };

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
        {matheaderdef:'Punto imagen', matcolumndef:'tipo', matcelldef: 'tipo'},
    ];
    }


    onZoom(row: any): void {
        console.log('zoom',);
    }


}

