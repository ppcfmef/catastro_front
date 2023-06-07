/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'registry',
    loadChildren: () => import('./land-registry/land-registry.module').then(m => m.LandRegistryModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./land-upload/land-upload.module').then(m => m.LandUploadModule)
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule)
  },
  {
    path: 'incomes',
    loadChildren: () => import('./incomes-data/incomes-data.module').then(m => m.IncomesDataModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandsRoutingModule { }
