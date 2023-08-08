import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/interfaces/table-columns.interface';
import { TableConifg } from '../../../shared/interfaces/table-config.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-points-without-land',
  templateUrl: './points-without-land.component.html',
  styleUrls: ['./points-without-land.component.scss']
})
export class PointsWithoutLandComponent implements OnInit {
    tableColumns: TableColumn[] =[];
    dataSource = [
        { nro: '01', mzurb:'A' , predio:5},
        { nro: '02', mzurb:'Z1' , predio:5},
        { nro: '03', mzurb:'P' , predio:5},
        { nro: '04', mzurb:'Z1' , predio:5},
    ];

    card ={
            num: 120,
            text: 'LOTES SIN PREDIO'
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
        {matheaderdef:'Sin predio', matcolumndef:'predio', matcelldef: 'predio'},
    ];
    }


    onZoom(row: any): void {
        console.log('zoom',);
    }

}
