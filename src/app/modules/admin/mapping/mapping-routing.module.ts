/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicMappingPage } from './pages/basic-mapping/basic-mapping.page';
import { MappingComponent } from './mapping.component';

const routes: Routes = [
  {path: '', component: MappingComponent},
  {path: 'basic', component: BasicMappingPage},
  {
      path: 'update',
      loadChildren: () => import('./geovisor/geovisor.module').then(m => m.GeovisorModule)
  },
  {
    path: 'management-upload',
    loadChildren: () => import('./management-upload/management-upload.module').then(m => m.ManagementUploadModule)
},
  {
    path: 'metadata',
    loadChildren: () => import('./metadata/metadata.module').then(m => m.MetadataModule)
  }
  ,
  {
    path: 'geovisor',
    loadChildren: () => import('./geovisor/geovisor.module').then(m => m.GeovisorModule)
  }
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingRoutingModule { }
