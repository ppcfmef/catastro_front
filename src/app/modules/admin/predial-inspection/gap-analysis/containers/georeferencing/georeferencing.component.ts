import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-georeferencing',
  templateUrl: './georeferencing.component.html',
  styleUrls: ['./georeferencing.component.scss']
})
export class GeoreferencingComponent implements OnInit {
    cards = [
        {
            title: 'predios sin cartografía inicial',
            numb: '400',
            color: '#003052'

        },
        {
            title: 'predios enlazados',
            numb: '200',
            color: '#003052',
        },
        {
            title: 'predios faltantes',
            numb: '182',
            color: '#003052',
            path: './geo'
        },
        {
            title: 'predios observados',
            numb: '20',
            color: '#003052',
            path: './geo'
        },
    ];

    displayedColumns: string[] = ['Nro', 'Código único de Predio', 'Contribuyente', 'Dirección', 'Estado', 'Acciones'];
    dataSource = [
        {nro: 1, cod: 'Hydrogen', contribuyente: 1.0079, direction: 'H' , estado:'disponible'},
    ];
  constructor() { }

  ngOnInit(): void {
  }

  redirecto(): void {
    //
  }

}
