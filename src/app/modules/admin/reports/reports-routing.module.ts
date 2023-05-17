import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportPage } from './pages/report/report.page';
import { ReportCartographicComponent } from './components/report-cartographic/report-cartographic.component';
import { ReportSituationalComponent } from './components/report-situational/report-situational.component';
import { ReportControlNationalComponent } from './components/report-control-national/report-control-national.component';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';

const routes: Routes = [
  {
    path: 'report',
    component: ReportPage,
    children: [
      {
        path: 'control-national',
        component: ReportControlNationalComponent,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'repoconnat', permissionType: 'read' },
      },
      {
        path: 'cartographic',
        component: ReportCartographicComponent,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'repocarto', permissionType: 'read' },
      },
      {
        path: 'situational',
        component: ReportSituationalComponent,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'repositua', permissionType: 'read' },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
