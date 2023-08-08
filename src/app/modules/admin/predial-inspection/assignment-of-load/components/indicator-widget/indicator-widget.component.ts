import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-indicator-widget',
    templateUrl: './indicator-widget.component.html',
    styleUrls: ['./indicator-widget.component.scss']
})
export class IndicatorWidgetComponent implements OnInit {

    cards =[
        {
            num: 21,
            text: 'PREDIOS ASIGNADOS PENDIENTES'
        },
        {
            num: 21,
            text: 'PUNTOS LOTES ASIGNADOS PENDIENTE'
        },
        {
            num: 21,
            text: 'MANZANA ASIGNADAS PENDIENTE'
        },
        {
            num: 21,
            text: 'MANZANAS VERIFICABLES EN CAMPO'
        },
        {
            num: 21,
            text: 'MANZANAS (EXPANSION URBANA)'
        },
        {
            num: 21,
            text: 'OPERADORES DE CAMPO'
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
