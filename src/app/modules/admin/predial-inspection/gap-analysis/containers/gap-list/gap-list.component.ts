import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gap-list',
  templateUrl: './gap-list.component.html',
  styleUrls: ['./gap-list.component.scss']
})
export class GapListComponent implements OnInit {
    cards = [
        {
            title: 'PUNTOS LOTES SIN PREDIOS',
            numb: '120',
            color: '#DE3F43'
        },
        {
            title: 'PREDIOS SIN GEOREFERENCIACION',
            numb: '284',
            color: '#0090F8',
            path: './geo'
        },
        {
            title: 'PREDIOS SUBVALUADOS',
            numb: '0',
            color: '#66BB6A'
        },
        {
            title: 'MANZANAS SIN LOTES',
            numb: '180',
            color: '#F89500'
        },
        {
            title: 'PUNTOS EN IMAGEN',
            numb: '110',
            color: '#0090F8'
        },
        {
            title: 'MANZANAS ACTUALIZACIóN',
            numb: '5',
            color: '#1E293B'
        },
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
