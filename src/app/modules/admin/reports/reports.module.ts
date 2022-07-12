import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportPage } from './pages/report/report.page';


@NgModule({
  declarations: [
    ReportPage,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatSidenavModule,
  ]
})
export class ReportsModule { }
