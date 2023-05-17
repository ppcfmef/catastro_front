import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportPage } from './pages/report/report.page';
import { ReportCartographicComponent } from './components/report-cartographic/report-cartographic.component';
import { ReportSituationalComponent } from './components/report-situational/report-situational.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReportControlNationalComponent } from './components/report-control-national/report-control-national.component';

@NgModule({
  declarations: [
    ReportPage,
    ReportCartographicComponent,
    ReportSituationalComponent,
    ReportControlNationalComponent,
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
