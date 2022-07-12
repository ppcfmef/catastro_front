import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Department, District, DistrictResource, Province } from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
    departments$: Observable<Department[]>;
    provinces$: Observable<Province[]>;
    districts$: Observable<District[]>;
    isValid=true;
    fileName: string;
    isDisabled =true;
    isDisabledDescargar =true;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output()
    buscarEventEmitter = new EventEmitter<any>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output()
    descargarEventEmmiterr =new EventEmitter<any>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output()
    cargarEventEmmiterr =new EventEmitter<any>();

    fileToUpload: any;
    params={
        // eslint-disable-next-line @typescript-eslint/naming-convention
        department:'',
        province:'',
        district:'',
        namedistrict:''
    } ;

    dataSearch: DistrictResource;

/*districtResource: DistrictResource;*/

  isReadOnly=false;
  constructor(private _commonService: CommonService) { }

  ngOnInit(): void {
    this.departments$= this._commonService.getDepartments();
  }
  selectDep(): void{
    this.provinces$=this._commonService.getProvinces({department: this.params.department});
  }

  selectProv(): void{
    this.districts$=this._commonService.getDistricts({province: this.params.province});

}

selectDist(event: any): void{

    if(this.params.district && this.params.district!=='' )
    {
        this.isDisabledDescargar=false;

        // eslint-disable-next-line @typescript-eslint/no-shadow
        this._commonService.getDistrictResource(this.params.district).subscribe( (data: DistrictResource)=>{
           
           this.dataSearch =data;
        });

        /*this._commonService.getDistrictResource(this.params.district).subscribe( (data: DistrictResource)=>{
           
            this.dataSearch =data;
         });*/

    }
}

buscar(): void {

    this.buscarEventEmitter.emit( this.params);
}

descargar(): void{
    this.descargarEventEmmiterr.emit(this.dataSearch);
}


uploadFile(event: any): void {
    this.fileToUpload = event.target.files.item(0);
    this.fileName = event.target.value;
    this.fileName = this.fileName.split(/(\\|\/)/g).pop();
    this.fileName = this.fileName.toString();
    const ext =  this.fileName.split('.').pop();
    console.log('ext>>',ext);
    this.isDisabled = false;
}

subirDato(): void{
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.cargarEventEmmiterr.emit(this.fileToUpload);

}

}

