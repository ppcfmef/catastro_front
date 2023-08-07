import { Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { style } from '@angular/animations';
import { Card } from '../../../shared/interfaces/card.interface';

@Component({
  selector: 'app-card-deatail',
  templateUrl: './card-deatail.component.html',
  styleUrls: ['./card-deatail.component.scss']
})
export class CardDeatailComponent implements OnInit {

    cardComponent: Card;
    color: string ;
    border: string;
    @Input()
    set styles(card: Card){
        this.cardComponent = card;
        this.color =  this.cardComponent.color;
        this.border = this.cardComponent.border;
    }
  constructor(public renderer: Renderer2) { }

  ngOnInit(): void {
  }

}
