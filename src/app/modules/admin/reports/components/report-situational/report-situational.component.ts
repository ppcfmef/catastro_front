import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'environments/environment';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { Department, District, Province } from 'app/core/common/interfaces/common.interface';
@Component({
  selector: 'app-report-situational',
  templateUrl: './report-situational.component.html',
  styleUrls: ['./report-situational.component.scss']
})
export class ReportSituationalComponent implements OnInit {

  portalUrl = environment.portalUrl;
  reportUrl?: any;
  formEdit: FormGroup;
  idView='repocarto';
  user: User;
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

  readAll: any=null;
  departments$: Observable<Department[]>;
  provinces$: Observable<Province[]>;
  districts$: Observable<District[]>;
  _unsubscribeAll: Subject<any> = new Subject<any>();
  hideSelectUbigeo= true;
  _emailUserAdmin='jcramireztello@gmail.com';
  constructor(
    private domSanitizer: DomSanitizer,
    private _commonService: CommonService,
    private _userService: UserService,
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

          if(readAll.length>0 || this.user.isSuperuser === true){
            this.initUbigeoParams(data.code);
            this.hideSelectUbigeo = false;
           }

          else {
            this.hideSelectUbigeo = true;
          }
          this.makeReportUrl(data.code);

        });
    });
    /*this.makeReportUrl();*/
  }

  initUbigeoParams(ubigeo: string): void {
    this.departments$ = this._commonService.getDepartments();
    /*this.paramsUbigeo= this.getParams(ubigeo);*/
   /* if(this.paramsUbigeo.dpto){ this.selectDep();}
    if(this.paramsUbigeo.prov){ this.selectProv();}
    if(this.paramsUbigeo.ubigeo){ this.selectDist();}*/

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

  openCloseUbigeo(close = ''): void{
    if(close === 'close'){
      this.hideUbigeo = true;
      return;
    }
    this.hideUbigeo = !this.hideUbigeo;
  }

  private getLand(ubigeo: any): any {
    return {
      dpto: ubigeo?ubigeo.substring(0,2):'14',
      prov: ubigeo?ubigeo.substring(2,4):'02',
      ubigeo: ubigeo?ubigeo:'140204',
    };
  }

  private getParams(ubigeo: any): any {
    return {
      dpto: ubigeo?ubigeo.substring(0,2):'14',
      prov: ubigeo?ubigeo.substring(0,4):'1402',
      ubigeo: ubigeo?ubigeo:'140204',
    };
  }


  private makeReportUrl(ubigeo: string): void {
    /*const baseUrl = this.getBaseUrl(land?.zone);
    const filters = `dpto=${land?.dpto}&prov=${land?.prov}&ubigeo=${land?.ubigeo}`;
    this.reportUrl =  this.domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}#${filters}`);

    */
    const land: any=this.getLand(ubigeo);
    console.log('land>>',land);
    const baseUrl = `${this.portalUrl}/apps/dashboards/dee6809e8bf54a31b7f8b07d4c1efbc9`;
    const filters = `dpto=${land?.dpto}&prov=${land?.prov}&ubigeo=${land?.ubigeo}`;

    this.reportUrl =  this.domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}#${filters}`);
    console.log('this.reportUrl>>',this.reportUrl);
    //const filters = `dpto=14&prov=02&ubigeo=140204`;
    /*if(this.readAll){
      this.reportUrl =  this.domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}`);
    }
    else{
      const filters = `dpto=${land?.dpto}&prov=${land?.prov}&ubigeo=${land?.ubigeo}`;
      this.reportUrl =  this.domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}#${filters}`);
    }*/
  }
}
