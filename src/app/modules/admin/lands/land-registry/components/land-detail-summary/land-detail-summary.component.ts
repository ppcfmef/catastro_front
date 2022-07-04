import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-land-detail-summary',
  templateUrl: './land-detail-summary.component.html',
  styleUrls: ['./land-detail-summary.component.scss']
})
export class LandDetailSummaryComponent implements OnInit {
  @Output()
  showFormEdit = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  emitShowFormEdit(){
    this.showFormEdit.emit(false);
  }

}
