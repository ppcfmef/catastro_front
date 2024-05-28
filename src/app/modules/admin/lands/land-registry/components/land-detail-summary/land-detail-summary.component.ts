import { Component, EventEmitter, OnInit, Output, OnDestroy, OnChanges, SimpleChanges, Input, inject } from '@angular/core';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandRegistryService } from '../../services/land-registry.service';

@Component({
  selector: 'app-land-detail-summary',
  templateUrl: './land-detail-summary.component.html',
  styleUrls: ['./land-detail-summary.component.scss']
})
export class LandDetailSummaryComponent implements OnInit, OnChanges, OnDestroy {
  @Output() showFormEdit = new EventEmitter<boolean>();
  @Input() landRecord: LandRegistryMap;

  landRegistryService = inject(LandRegistryService);
  constructor() { }

  ngOnInit(): void {
  }

  emitShowFormEdit(): void{
    console.log(this.landRecord, 'lanrecord');
    this.showFormEdit.emit(true);
  }

  emitDestroyFormEdit(): void {
    this.showFormEdit.emit(null);
    this.landRegistryService.landSelectedSource.next(true);
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
