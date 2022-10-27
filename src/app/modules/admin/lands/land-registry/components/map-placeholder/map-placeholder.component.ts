import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-placeholder',
  templateUrl: './map-placeholder.component.html',
  styleUrls: ['./map-placeholder.component.scss']
})
export class MapPlaceholderComponent implements OnInit {

  @Input() texto = 'texto prueba';
  constructor() { }

  ngOnInit(): void {
  }

}
