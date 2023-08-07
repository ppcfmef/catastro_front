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
            border: '#073E0A',
            color:'#80C684',

        },
        {
            title: 'predios enlazados',
            numb: '200',
            border: '#003052',
            color:'#8BCDF9',
        },
        {
            title: 'predios faltantes',
            numb: '182',
            border: '#523100',
            color:'#FAC375',
            path: './geo'
        },
        {
            title: 'predios observados',
            numb: '20',
            border: '#6D0000',
            color:'#EB7070',
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

  click(): void {
    console.log('here');
  }

}
