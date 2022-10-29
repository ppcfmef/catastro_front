import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportPage } from './pages/report/report.page';
import { ReportCartographicComponent } from './components/report-cartographic/report-cartographic.component';
import { ReportSituationalComponent } from './components/report-situational/report-situational.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReportPage,
    ReportCartographicComponent,
    ReportSituationalComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatSidenavModule,
    FormsModule
  ]
})
export class ReportsModule { }
