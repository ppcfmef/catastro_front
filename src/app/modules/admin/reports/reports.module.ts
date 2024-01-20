import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportPage } from './pages/report/report.page';
import { ReportCartographicComponent } from './components/report-cartographic/report-cartographic.component';
import { ReportSituationalComponent } from './components/report-situational/report-situational.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReportControlNationalComponent } from './components/report-control-national/report-control-national.component';
import { ReportMunicipalIndicatorsComponent } from './components/report-municipal-indicators/report-municipal-indicators.component';

@NgModule({
  declarations: [
    ReportPage,
    ReportCartographicComponent,
    ReportSituationalComponent,
    ReportControlNationalComponent,
    ReportMunicipalIndicatorsComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatSidenavModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class ReportsModule { }
