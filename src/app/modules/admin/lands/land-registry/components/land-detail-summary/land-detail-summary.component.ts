import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LandRecordService } from '../../services/land-record.service';

@Component({
  selector: 'app-land-detail-summary',
  templateUrl: './land-detail-summary.component.html',
  styleUrls: ['./land-detail-summary.component.scss']
})
export class LandDetailSummaryComponent implements OnInit {
  @Output()
  showFormEdit = new EventEmitter<Boolean>();

  constructor(
    private readonly landRecordService: LandRecordService
  ) { }

  ngOnInit(): void {
    this.landRecordService.getLocalLandRecord();
  }

  emitShowFormEdit(){
    this.showFormEdit.emit(false);
  }

}
