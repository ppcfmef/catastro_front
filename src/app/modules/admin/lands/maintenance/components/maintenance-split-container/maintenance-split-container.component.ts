import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LandUI } from '../../interfaces/land.interface';
import { LandMaintenanceService } from '../../services/land-maintenance.service';

@Component({
  selector: 'app-maintenance-split-container',
  templateUrl: './maintenance-split-container.component.html',
  styleUrls: ['./maintenance-split-container.component.scss']
})
export class MaintenanceSplitContainerComponent implements OnInit,OnChanges {
    @Input() idLand: number;
    landRecords: LandUI[];
    constructor(private landMaintenanceService: LandMaintenanceService) {
    }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes.idLand.currentValue){
    const queryParams={id:this.idLand};
    this.landMaintenanceService.getList(queryParams)
       .toPromise()
       .then(
       (landResult) => {
           this.landRecords = landResult.results;
       }
       );
    }
}
  ngOnInit(): void {
  }

}
