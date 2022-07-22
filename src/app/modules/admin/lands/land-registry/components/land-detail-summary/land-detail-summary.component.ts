import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandRegistryMapService } from '../../services/land-registry-map.service';

@Component({
  selector: 'app-land-detail-summary',
  templateUrl: './land-detail-summary.component.html',
  styleUrls: ['./land-detail-summary.component.scss']
})
export class LandDetailSummaryComponent implements OnInit {
  @Output() showFormEdit = new EventEmitter<boolean>();
  landRecord: LandRegistryMap;

  constructor(
    private landRegistryMapService: LandRegistryMapService
  ) { }

  ngOnInit(): void {
    this.landRegistryMapService.landIn$
    .subscribe(result => this.landRecord = result);
  }

  emitShowFormEdit(): void{
    this.showFormEdit.emit(false);
  }

}
