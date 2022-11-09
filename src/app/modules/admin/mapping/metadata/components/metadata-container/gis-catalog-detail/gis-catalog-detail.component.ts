import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GisCatalog } from '../../../interfaces/gis-catalog.interface';

@Component({
  selector: 'app-gis-catalog-detail',
  templateUrl: './gis-catalog-detail.component.html',
  styleUrls: ['./gis-catalog-detail.component.scss']
})
export class GisCatalogDetailComponent implements OnInit {
  @Input() catalog: GisCatalog;
  @Output() closeDetail: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.closeDetail.emit(true);
  }

}
