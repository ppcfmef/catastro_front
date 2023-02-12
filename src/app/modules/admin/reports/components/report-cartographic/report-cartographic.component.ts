import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Department, District, Province } from 'app/core/common/interfaces/common.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-report-cartographic',
  templateUrl: './report-cartographic.component.html',
  styleUrls: ['./report-cartographic.component.scss']
})
export class ReportCartographicComponent implements OnInit {
    portalUrl = environment.portalUrl;
    reportUrl?: any;

  user: User;
  land: any;
  readAll: any=null;
  departments$: Observable<Department[]>;
  provinces$: Observable<Province[]>;
  districts$: Observable<District[]>;
  _unsubscribeAll: Subject<any> = new Subject<any>();
  formEdit: FormGroup;
  paramsUbigeo: any= {
    dpto: null,
    prov: null,
    ubigeo: null,
  };

  selectionText={
    dep:'',
    prov:'',
    dist:''
  };

  hideUbigeo = true;
  idView='repocarto';
  hideSelectUbigeo= true;
  _emailUserAdmin='jcramireztello@gmail.com';
  constructor(
    private domSanitizer: DomSanitizer,
    private _userService: UserService,
    private _commonService: CommonService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: User) => {
        this.user = user;
        console.log('this.user>>',this.user);
        const permissionsNavigation: any[]=this.user?.permissionsNavigation;
        const readAll = permissionsNavigation.filter((p: any)=>(p?.navigationView===this.idView && p?.type==='read_all'));
        console.log('readAll>>',readAll);
        const ubigeo = this.user.ubigeo? this.user.ubigeo: '150101';
        this._commonService.getDistrictResource(ubigeo).subscribe((data)=>{

          if(readAll.length>0 || this.user.email === this._emailUserAdmin){
            this.initUbigeoParams(data.code);
            this.hideSelectUbigeo = false;
           }

          else {
            this.hideSelectUbigeo = true;
          }
          this.makeReportUrl(data.code);

        });
    });
  }


  initUbigeoParams(ubigeo: string): void {
    this.departments$ = this._commonService.getDepartments();


  }

  selectDep(event: any): void {

    this.paramsUbigeo.dpto = event.value.code;
    this.selectionText={
      dep:event.value.name,
      prov:'',
      dist:''
    };
    this.provinces$ = this._commonService.getProvinces({
        department: this.paramsUbigeo.dpto,
    });
    this.districts$ =  null;
  }

  selectProv(event: any): void {
    console.log(event);
    this.paramsUbigeo.prov = event.value.code;
    this.selectionText.prov = event.value.name;
    this.selectionText.dist= '';
    this.districts$ = this._commonService.getDistricts({
        province: `${this.paramsUbigeo.prov}`,
    });
  }

  selectDist(event: any): void {
    this.paramsUbigeo.ubigeo = event.value.code;
    this.selectionText.dist = event.value.name;
    console.log('this.paramsUbigeo.ubigeo>>',this.paramsUbigeo.ubigeo);
    this.makeReportUrl(this.paramsUbigeo.ubigeo);

  }


  createFormEdit(): void{
    this.formEdit = this.fb.group({
      ubigeo: [null],
    });
  }
  openCloseUbigeo(close: string = ''): void{
    if(close === 'close'){
      this.hideUbigeo = true;
      return;
    }
    this.hideUbigeo = !this.hideUbigeo;
  }
  private makeReportUrl(ubigeo: any): void {
    const land: any=this.getLand(ubigeo);
    const baseUrl = `${this.portalUrl}/apps/dashboards/d3bcfc8538b54760a429605a1cd5d6fd`;
    const filters = `dpto=${land?.dpto}&prov=${land?.prov}&ubigeo=${land?.ubigeo}`;
    this.reportUrl =  this.domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}#${filters}`);
  }

  /*private getLand(data: any): any {
    return {
      dpto: data.code?data.code.substring(0,2):'14',
      prov: data.code?data.code.substring(2,4):'02',
      ubigeo: data.code?data.code:'140204',
      zone: (data?.resources[0])?.utm?data?.resources[0]?.utm:'17'
    };
  }*/

  private getLand(ubigeo: any): any {
    return {
      dpto: ubigeo?ubigeo.substring(0,2):'14',
      prov: ubigeo?ubigeo.substring(2,4):'02',
      ubigeo: ubigeo?ubigeo:'140204',
    };
  }



  private getBaseUrl(zone: string): string {
    const ZONE_17 = 'https://ws.mineco.gob.pe/portaldf/apps/dashboards/de4f0c6fd4304cf1bd0fc07902e95444';
    const ZONE_18 = 'https://ws.mineco.gob.pe/portaldf/apps/dashboards/c2371b64f6d446cfac9f8e4968cf3dcd';
    const ZONE_19 = 'https://ws.mineco.gob.pe/portaldf/apps/dashboards/b74de8b8967e43d4873c38be18aed366';

    switch(zone) {
      case '17': {
         return ZONE_17;
      }
      case '18': {
         return ZONE_18;
      }
      case '19': {
        return ZONE_19;
     }
      default: {
        return ZONE_17;
      }
   }
  }



/*
  private makeReportUrl(ubigeo: string): void {

    const land: any=this.getLand(ubigeo);
    console.log('land>>',land);
    const baseUrl = `${this.portalUrl}/apps/dashboards/dee6809e8bf54a31b7f8b07d4c1efbc9`;
    const filters = `dpto=${land?.dpto}&prov=${land?.prov}&ubigeo=${land?.ubigeo}`;

    this.reportUrl =  this.domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}#${filters}`);

  }
*/
}
