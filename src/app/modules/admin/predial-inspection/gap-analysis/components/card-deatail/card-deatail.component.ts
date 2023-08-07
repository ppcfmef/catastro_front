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

    @ViewChild('button') button: ElementRef;
    @HostBinding('style.color') color;
    cardComponent: Card;
    @Input()
    set styles(card: Card){
        this.cardComponent = card;
        this.color =  this.cardComponent.color;
        this.button.nativeElement.style['border'] = '2px solid #980895';
    }
  constructor(public renderer: Renderer2) { }

  ngOnInit(): void {
  }

}
