import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GisCatalog } from '../../../interfaces/gis-catalog.interface';

@Component({
  selector: 'app-gis-catalog',
  templateUrl: './gis-catalog.component.html',
  styleUrls: ['./gis-catalog.component.scss']
})
export class GisCatalogComponent implements OnInit {

  @Input() catalog: GisCatalog;
  @Output() showDetail: EventEmitter<GisCatalog> = new EventEmitter<GisCatalog>();

  constructor() { }

  ngOnInit(): void {
  }

  onDetail(): void {
    this.showDetail.emit(this.catalog);
  }

}
