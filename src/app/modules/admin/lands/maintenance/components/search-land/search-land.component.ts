import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LandUI } from '../../interfaces/land.interface';
import { LandMaintenanceService } from '../../services/land-maintenance.service';

@Component({
  selector: 'app-search-land',
  templateUrl: './search-land.component.html',
  styleUrls: ['./search-land.component.scss']
})
export class SearchLandComponent implements OnInit {
    search: FormGroup;
    landRecords: LandUI[]=[];
    cupSelect: string;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output() agregarPredioEvent: EventEmitter<any> = new EventEmitter();
  constructor(private _fb: FormBuilder,private _landMaintenanceService: LandMaintenanceService) {

  }

  ngOnInit(): void {
    this.search = this._fb.group({
        search: [''],
    });
  }
  onCleanSearch(): void{
    this.search.get('search').setValue(null);
    this.landRecords=[];
    this.cupSelect=null;
  }
  onClickSearch(): void {
    const search = this.search.get('search').value;
    const queryParams={search};
    this._landMaintenanceService.getList(queryParams)
       .toPromise()
       .then(
       (landResult) => {
           this.landRecords = landResult.results;
       }
       );
    }


    onSelectedPredio(event: any): void{
        this.cupSelect=event.option.value;
    }


    onClickAgregarPredio(): void{

        if(this.cupSelect){
            const queryParams={search:this.cupSelect};
            this._landMaintenanceService.getList(queryParams)
               .toPromise()
               .then(
               (landResult) => {
                    console.log('landResult>>',landResult);
                   this.landRecords = landResult.results;
                   this.agregarPredioEvent.emit(this.landRecords[0]);
               }
               );
        }


    }
}
