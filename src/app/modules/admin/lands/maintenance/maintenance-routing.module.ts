import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { ListLandMaintenancePage } from './pages/list-land-maintenance/list-land-maintenance.page';

import { MaintenanceAccumulationPage } from './pages/maintenance-accumulation/maintenance-accumulation.page';
import { MaintenanceReassignmentPage } from './pages/maintenance-reassignment/maintenance-reassignment.page';
import { MaintenanceSplitPage } from './pages/maintenance-split/maintenance-split.page';


const routes: Routes = [
    {
        path: '',
        component: ListLandMaintenancePage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'gprmain', permissionType: 'read' },

    },
    {
        path: 'accumulation/:idLand',
        component: MaintenanceAccumulationPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'gprmain', permissionType: 'read' },

    },
    {
        path: 'reassignment/:idLand',
        component: MaintenanceReassignmentPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'gprmain', permissionType: 'read' },

    },
    {
        path: 'split/:idLand',
        component: MaintenanceSplitPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'gprmain', permissionType: 'read' },

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
