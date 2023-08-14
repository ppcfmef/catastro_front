import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    cards = [
        {
            title: 'ANALISIS DE BRECHAS',
            svg: 'iconsmind:chartData',
            path:'./gap-analysis'
        },
        {
            title: 'ASIGNACION DE CARGA',
            svg: 'iconsmind:assignmentAdd',
            path:'./assignment-of-load'
        },
        {
            title: 'GESTION DE RESULTADOS',
            svg: 'iconsmind:manageHistory',
            path: './results-management'
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
