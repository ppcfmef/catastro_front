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

    displayedColumns: string[] = ['nro', 'cod', 'contribuyente', 'direction', 'estado', 'actions'];
    dataSource = [
        {nro: 1, cod: '45678-4561381-22', contribuyente:'Abel Contreras Hinostroza', direction: 'Av. Los Ciruelos 728 Piso 2 Depto 89 int2' , estado:'disponible', actions: ''},
        {nro: 2, cod: '45678-4561381-22', contribuyente:'Romel Garcia Torres', direction: 'Av. Los Ciruelos 728 Piso 2 Depto 89 int2' , estado:'disponible', actions: ''},
        {nro: 3, cod: '45678-4561381-22', contribuyente:'Carlos Fabian Sotelo Muñoz', direction: 'Av. Los Ciruelos 728 Piso 2 Depto 89 int2' , estado:'disponible', actions: ''},
        {nro: 4, cod: '45678-4561381-22', contribuyente:'Marcelo Rodrigues Quispe', direction: 'Av. Los Ciruelos 728 Piso 2 Depto 89 int2' , estado:'disponible', actions: ''},
        {nro: 5, cod: '45678-4561381-22', contribuyente:'Abel Contreras Hinostroza', direction: 'Av. Los Ciruelos 728 Piso 2 Depto 89 int2' , estado:'disponible', actions: ''},
    ];
  constructor() { }

  ngOnInit(): void {
  }

  redirecto(): void {
    //
  }

}
