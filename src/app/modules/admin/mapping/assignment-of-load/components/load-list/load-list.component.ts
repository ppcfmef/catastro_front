import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-list',
  templateUrl: './load-list.component.html',
  styleUrls: ['./load-list.component.scss']
})
export class LoadListComponent implements OnInit {

  cargasData = [
    { nro: '01', codCarga: '4567845', fecha: '22/06/2023' },
    { nro: '02', codCarga: '4567845', fecha: '22/06/2023' },
    { nro: '03', codCarga: '4567845', fecha: '22/06/2023' },
    { nro: '04', codCarga: '4567845', fecha: '22/06/2023' }
  ];

  displayedColumns: string[] = ['nro', 'codCarga', 'fecha', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

}
