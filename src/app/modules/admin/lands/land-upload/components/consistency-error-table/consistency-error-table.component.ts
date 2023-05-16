import { Component, OnInit , ViewChild,} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-consistency-error-table',
  templateUrl: './consistency-error-table.component.html',
  styleUrls: ['./consistency-error-table.component.scss']
})
export class ConsistencyErrorTableComponent implements OnInit {

    @ViewChild(MatTable) recordsTable: MatTable<any>;

    displayedColumns = ['nro','error', 'actions'];
    dataSource = new MatTableDataSource<any>([]);

    constructor() { }

    ngOnInit(): void {
        this.dataSource.data.push(
            {nro:26,error:'COD_CPU = 55448762 Este registro esta duplicado con la fila 11 y 15 '},
            {nro:26,error:'COD_CPU = 55448762 Este registro esta duplicado con la fila 11 y 15 '},
            {nro:26,error:'COD_CPU = 55448762 Este registro esta duplicado con la fila 11 y 15 '},
        );
    }

}
