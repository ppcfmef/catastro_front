/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { Department, District, DistrictResource, Province } from 'app/core/common/interfaces/common.interface';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Role } from 'app/shared/enums/role.enum';
import { ServiceLayer } from 'app/shared/models/image-layer.interface';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() listImageLayers: ServiceLayer[] = [];
  @Output() buscarEventEmitter = new EventEmitter<any>();
  @Output() descargarEventEmmiterr = new EventEmitter<any>();
  @Output() cargarEventEmmiterr = new EventEmitter<any>();

  user: User;
  _unsubscribeAll: Subject<any> = new Subject<any>();
  departments$: Observable<Department[]>;
  provinces$: Observable<Province[]>;
  districts$: Observable<District[]>;
  isValid = true;
  fileName: string;
  isDisabled = true;
  isDisabledDescargar = true;
  isDisabledCargar = false;

  layers: any[]=[];


  fileToUpload: any;
  params = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      department: '',
      province: '',
      district: '',
      namedistrict: '',
      projection: 0,
      serviceId:null,
      featureId:0,
      fileToUpload:null,
  };

  dataSearch: DistrictResource;

  isReadOnly = false;
  menssage: string='';

  constructor(
      private _commonService: CommonService,
      private _userService: UserService,
      private _fuseSplashScreenService: FuseSplashScreenService
  ) {}

  ngOnInit(): void {

      this._userService.user$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((user: User) => {
              this.user = user;
              const ubigeo =
                  this.user && this.user.ubigeo
                      ? this.user.ubigeo
                      : '150101';

              this._commonService
                  .getDistrictResource(ubigeo)
                  .subscribe((data: DistrictResource) => {
                      this.params.department = data.department;
                      this.params.province = data.province;
                      this.params.district = ubigeo;
                      this.initParams();
                  });
          });
  }

  /*ngOnChanges(): void{
    this.selectService();
  }*/


  selectService(): void{
    const imageLayer=this.listImageLayers.find( (l: ServiceLayer) => l.id===this.params.serviceId);
    this.layers=(imageLayer)?imageLayer.layers:[];
  }
  initParams(): void {
    if(this.user.placeScope.id === Role.DISTRITAL){
        this.isReadOnly=true;
        //this.buscar(this.params);
    }
      this.departments$ = this._commonService.getDepartments();

      this.params.department ? this.selectDep() : false;
      this.params.province ? this.selectProv() : false;
      this.params.district ? this.selectDist() : false;
  }

  selectDep(): void {
      this.provinces$ = this._commonService.getProvinces({
          department: this.params.department,
      });
  }

  selectProv(): void {
      this.districts$ = this._commonService.getDistricts({
          province: this.params.province,
      });
  }

  selectDist(): void {
      if (this.params.district && this.params.district !== '') {
          this.isDisabledDescargar = false;

          // eslint-disable-next-line @typescript-eslint/no-shadow
          this._commonService
              .getDistrictResource(this.params.district)
              .subscribe((data: DistrictResource) => {
                  this.dataSearch = data;
                  this.params.projection = parseInt(
                      '327' + this.dataSearch.resources[0].utm,
                      10
                  );

                  this.params.namedistrict = data.name;
                  this.menssage=`Distrito ${this.params.namedistrict} - zona utm ${this.dataSearch.resources[0].utm}`;
                  this.buscar();
              });


      }
  }

  buscar(): void {
      this.buscarEventEmitter.emit(this.params);
  }

  descargar(): void {
      this.descargarEventEmmiterr.emit(this.params);
  }


  cargar(): void{
    this.cargarEventEmmiterr.emit(this.params);
  }

  uploadFile(event: any): void {
    //this._fuseSplashScreenService.show(0);
    this.fileToUpload = event.target.files[0];
    this.fileName = event.target.value;
    this.fileName = this.fileName.split(/(\\|\/)/g).pop();
    this.fileName = this.fileName.toString();
    const ext = this.fileName.split('.').pop();
    this.isDisabled = false;
    this.params.fileToUpload = this.fileToUpload;
}

}
