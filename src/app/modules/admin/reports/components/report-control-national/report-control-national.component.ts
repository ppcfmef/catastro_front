import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-report-control-national',
  templateUrl: './report-control-national.component.html',
  styleUrls: ['./report-control-national.component.scss']
})
export class ReportControlNationalComponent implements OnInit {

  portalUrl = environment.portalUrl;
  url: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.portalUrl}/apps/dashboards/3c6bab9465d24b2bbf25ce27159b83ee`
    );
  }

}
