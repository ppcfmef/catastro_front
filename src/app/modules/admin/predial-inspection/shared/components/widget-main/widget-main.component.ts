import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-main',
  templateUrl: './widget-main.component.html',
  styleUrls: ['./widget-main.component.scss']
})
export class WidgetMainComponent implements OnInit {

    @Input() card: {
        num: number;
        text: string;
    };

  constructor() { }

  ngOnInit(): void {
  }

}
