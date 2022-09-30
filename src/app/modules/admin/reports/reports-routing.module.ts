import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportPage } from './pages/report/report.page';
import { ReportCartographicComponent } from './components/report-cartographic/report-cartographic.component';
import { ReportSituationalComponent } from './components/report-situational/report-situational.component';

const routes: Routes = [
  {
    path: 'report',
    component: ReportPage,
    children: [
      {
        path: 'cartographic',
        component: ReportCartographicComponent
      },
      {
        path: 'situational',
        component: ReportSituationalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
