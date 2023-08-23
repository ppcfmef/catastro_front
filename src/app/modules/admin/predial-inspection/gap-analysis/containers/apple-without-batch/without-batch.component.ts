import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-without-batch',
  templateUrl: './without-batch.component.html',
  styleUrls: ['./without-batch.component.scss']
})
export class WithoutBatchComponent implements OnInit {
    tableColumns: TableColumn[] =[];
    dataSource = [
        { nro: '01', mzurb:'A' },
        { nro: '02', mzurb:'Z1' },
        { nro: '03', mzurb:'P' },
        { nro: '04', mzurb:'Z1' },
    ];

    card ={
            num: 21,
            text: 'MANZANAS AL BARRER'
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
    ];
    }


    onZoom(row: any): void {
        console.log('zoom',);
    }

}
