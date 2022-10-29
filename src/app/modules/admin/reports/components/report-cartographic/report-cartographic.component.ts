import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'app/core/common/services/common.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-report-cartographic',
  templateUrl: './report-cartographic.component.html',
  styleUrls: ['./report-cartographic.component.scss']
})
export class ReportCartographicComponent implements OnInit {

  reportUrl?: any;
  user: User;
  _unsubscribeAll: Subject<any> = new Subject<any>();
  land: any;
  constructor(
    private domSanitizer: DomSanitizer,
    private _userService: UserService,
    private _commonService: CommonService,
  ) { }

  ngOnInit(): void {

    this._userService.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: any) => {
      this.user = user;
      const ubigeo = this.user.ubigeo? this.user.ubigeo: '150101';
      this._commonService.getDistrictResource(ubigeo).subscribe((data)=>{
        this.makeReportUrl(data);
      });
    });
  }

  private makeReportUrl(dataUbigeo: any): void {
    const land = this.getLand(dataUbigeo);
    console.log('land>>',land);
    const baseUrl = this.getBaseUrl(land?.zone);
    const filters = `dpto=${land?.dpto}&prov=${land?.prov}&ubigeo=${land?.ubigeo}`;
    this.reportUrl =  this.domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}#${filters}`);
  }

  private getLand(data: any): any {
    console.log('data>>',data);

    return {
      dpto: data.code?data.code.substring(0,2):'14',
      prov: data.code?data.code.substring(2,4):'02',
      ubigeo: data.code?data.code:'140204',
      zone: (data?.resources[0])?.utm?data?.resources[0]?.utm:'17'
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

}
