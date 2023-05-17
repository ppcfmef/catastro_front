import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { ViewerLandMaintenancePage } from './viewer-land-maintenance/viewer-land-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component:  ViewerLandMaintenancePage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gesmapmain', permissionType: 'read' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapLandMaintenanceRoutingModule { }
