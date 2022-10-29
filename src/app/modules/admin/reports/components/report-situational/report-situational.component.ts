import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-report-situational',
  templateUrl: './report-situational.component.html',
  styleUrls: ['./report-situational.component.scss']
})
export class ReportSituationalComponent implements OnInit {

  portalUrl = environment.portalUrl;
  reportUrl?: any;
  formEdit: FormGroup;

  constructor(
    private domSanitizer: DomSanitizer,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.makeReportUrl();
  }

  createFormEdit(): void{
    this.formEdit = this.fb.group({
      ubigeo: [null],
    });
  }

  private makeReportUrl(): void {
    // 140204
    const baseUrl = `${this.portalUrl}/apps/dashboards/dee6809e8bf54a31b7f8b07d4c1efbc9`;
    const filters = 'dpto=14&prov=02&ubigeo=140204';
    this.reportUrl =  this.domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}#${filters}`);
  }

}
