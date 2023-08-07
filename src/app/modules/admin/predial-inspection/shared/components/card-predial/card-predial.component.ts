import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Card } from '../../interfaces/card.interface';


@Component({
    selector: 'app-card-predial',
    templateUrl: './card-predial.component.html',
    styleUrls: ['./card-predial.component.scss'],
})
export class CardPredialComponent implements OnInit {
    @HostBinding('style.color') color;
    cardComponent: Card;
    @Input() set card( card: Card){
        this.cardComponent = card;
        this.color = this.cardComponent.color;
    };
    constructor() {}

    ngOnInit(): void {}
}

