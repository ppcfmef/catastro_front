import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLandMaintenancePage } from './pages/list-land-maintenance/list-land-maintenance.page';

import { MaintenanceAccumulationPage } from './pages/maintenance-accumulation/maintenance-accumulation.page';
import { MaintenanceReassignmentPage } from './pages/maintenance-reassignment/maintenance-reassignment.page';
import { MaintenanceSplitPage } from './pages/maintenance-split/maintenance-split.page';


const routes: Routes = [
    {
        path: '',
        component: ListLandMaintenancePage,

    },
    {
        path: 'accumulation/:idLand',
        component: MaintenanceAccumulationPage,

    },
    {
        path: 'reassignment/:idLand',
        component: MaintenanceReassignmentPage,

    },
    {
        path: 'split/:idLand',
        component: MaintenanceSplitPage,

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
