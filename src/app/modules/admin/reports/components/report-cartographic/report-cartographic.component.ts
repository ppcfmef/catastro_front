import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-report-cartographic',
  templateUrl: './report-cartographic.component.html',
  styleUrls: ['./report-cartographic.component.scss']
})
export class ReportCartographicComponent implements OnInit {

  reportUrl?: any;

  constructor(
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.makeReportUrl();
  }

  private makeReportUrl(): void {
    const land = this.getLand();
    const baseUrl = this.getBaseUrl(land?.zone);
    const filters = `dpto=${land?.dpto}&prov=${land?.prov}&ubigeo=${land?.ubigeo}`;
    this.reportUrl =  this.domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}#${filters}`);
  }

  private getLand(): any {
    return {
      dpto: '14',
      prov: '02',
      ubigeo: '140204',
      zone: '17'
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
