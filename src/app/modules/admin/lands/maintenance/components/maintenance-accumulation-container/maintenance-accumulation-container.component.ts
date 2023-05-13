import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LandUI } from '../../interfaces/land.interface';
import { LandMaintenanceService } from '../../services/land-maintenance.service';

@Component({
  selector: 'app-maintenance-accumulation-container',
  templateUrl: './maintenance-accumulation-container.component.html',
  styleUrls: ['./maintenance-accumulation-container.component.scss']
})
export class MaintenanceAccumulationContainerComponent implements OnInit,OnChanges {
    @Input() idLand: number;
    landRecords: LandUI[];
  constructor(private landMaintenanceService: LandMaintenanceService) { }
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

  onAgregarPredio(land: LandUI): void{
    const copy=[... this.landRecords];
    const el=copy.find(e=> e.cup===land.cup);
    if(!el){
        copy.push(land);
        this.landRecords=copy;
    }

  }

  ondataSourceUpdate(landRecords: LandUI[]): void{
    this.landRecords =landRecords;
  }
}
