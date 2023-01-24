import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor() { }
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;

  length: number = 0;
  pageIndex = 0;
  pageSize = 10;
  displayedColumns: string[] = ['nro', 'module', 'action', 'date'];
  dataSource = [
    {module: 'Gestión cartográfica - Carga de cartografia base', action: 'Carga zona nueva', date: '03-05-2022'},
    {module: 'Gestión cartográfica - Carga de cartografia base', action: 'Carga zona nueva', date: '03-05-2022'},
    {module: 'Gestión cartográfica - Carga de cartografia base', action: 'Carga zona nueva', date: '03-05-2022'},
    {module: 'Gestión cartográfica - Carga de cartografia base', action: 'Carga zona nueva', date: '03-05-2022'},
    {module: 'Gestión cartográfica - Carga de cartografia base', action: 'Carga zona nueva', date: '03-05-2022'},
    
  ];
  defaultPaginator;

  ngOnInit(): void {
  }

}
