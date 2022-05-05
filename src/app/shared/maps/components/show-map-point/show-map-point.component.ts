import { Component, OnInit, Input } from '@angular/core';

import { Coordinates } from '../../maps.type';

@Component({
  selector: 'app-show-map-point',
  templateUrl: './show-map-point.component.html',
  styleUrls: ['./show-map-point.component.scss']
})
export class ShowMapPointComponent implements OnInit {

  @Input() points: Coordinates[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.points);
  }

}
