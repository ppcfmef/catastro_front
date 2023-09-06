import { Component, Input, OnInit } from '@angular/core';
import { IOperator } from '../../interfaces/operator.interface';


@Component({
    selector: 'app-detail-operador',
    templateUrl: './detail-operador.component.html',
    styleUrls: ['./detail-operador.component.scss'],
})
export class DetailOperadorComponent implements OnInit {
    @Input() data: IOperator;
    constructor() {}
    ngOnInit(): void {}
}
