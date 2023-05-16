import { Component, OnInit , ViewChild,} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-format-error-table',
  templateUrl: './format-error-table.component.html',
  styleUrls: ['./format-error-table.component.scss']
})
export class FormatErrorTableComponent implements OnInit {
    @ViewChild(MatTable) recordsTable: MatTable<any>;

    displayedColumns = ['nro','error', 'correccion', 'actions'];
    dataSource = new MatTableDataSource<any>([]);

    constructor() { }

    ngOnInit(): void {
        this.dataSource.data.push(
            {nro:26,error:'AREA_TERRENO = 20mt2 Este campo debe ser tipo de dato doble', correcion:null},
            {nro:26,error:'AREA_TERRENO = 20mt2 Este campo debe ser tipo de dato doble', correcion:null},
            {nro:26,error:'AREA_TERRENO = 20mt2 Este campo debe ser tipo de dato doble', correcion:null}
        );
    }

}
