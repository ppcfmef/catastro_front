import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LandUI } from '../../interfaces/land.interface';
import { LandMaintenanceService } from '../../services/land-maintenance.service';
import { CommonUtils } from 'app/core/common/utils/common.utils';

@Component({
  selector: 'app-search-land',
  templateUrl: './search-land.component.html',
  styleUrls: ['./search-land.component.scss']
})
export class SearchLandComponent implements OnInit {
    search: UntypedFormGroup;
    landRecords: LandUI[]=[];
    cupSelect: string;
    ubigeo='';
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output() agregarPredioEvent: EventEmitter<any> = new EventEmitter();
  constructor(private _fb: UntypedFormBuilder,private _landMaintenanceService: LandMaintenanceService) {

  }

  ngOnInit(): void {
    this.ubigeo=localStorage.getItem('ubigeo')?localStorage.getItem('ubigeo'):null;
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
    const filterRawValue={search, ubigeo: this.ubigeo};
    const queryParams=CommonUtils.deleteKeysNullInObject(filterRawValue);
    this._landMaintenanceService.getList(queryParams)
       .toPromise()
       .then(
       (landResult) => {
           this.landRecords = landResult.results;
           if(!this.landRecords || this.landRecords.length===0 ){

            this.cupSelect=null;
           }

       }
       );
    }

    onChangeSearchPredio(event: any): void{
        this.landRecords=[];
        this.cupSelect=null;
    }
    onSelectedPredio(event: any): void{
        console.log('event>>',event);
        this.cupSelect=event.option.value.id;
    }

    displayFn(option: any): string {
        console.log(option, 'opt')
        return option && option.cup ? option.cup : '';

    }


    onClickAgregarPredio(): void{

        if(this.cupSelect){
            const filterRawValue={id:this.cupSelect,ubigeo:this.ubigeo};
            const queryParams=CommonUtils.deleteKeysNullInObject(filterRawValue);
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
