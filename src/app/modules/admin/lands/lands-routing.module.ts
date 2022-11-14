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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandsRoutingModule { }
