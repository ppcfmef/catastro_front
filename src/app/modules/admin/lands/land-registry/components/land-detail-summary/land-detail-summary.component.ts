import { Component, EventEmitter, OnInit, Output, OnDestroy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';

@Component({
  selector: 'app-land-detail-summary',
  templateUrl: './land-detail-summary.component.html',
  styleUrls: ['./land-detail-summary.component.scss']
})
export class LandDetailSummaryComponent implements OnInit, OnChanges, OnDestroy {
  @Output() showFormEdit = new EventEmitter<boolean>();
  @Input() landRecord: LandRegistryMap;

  constructor() { }

  ngOnInit(): void {
  }

  emitShowFormEdit(): void{
    this.showFormEdit.emit(true);
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
