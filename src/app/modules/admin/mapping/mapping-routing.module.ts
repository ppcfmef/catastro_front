/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicMappingPage } from './pages/basic-mapping/basic-mapping.page';
import { MappingComponent } from './mapping.component';

const routes: Routes = [
  {path: '', component: MappingComponent},
  {path: 'basic', component: BasicMappingPage},
  {
      path: 'carga',
      loadChildren: () => import('./geovisor/geovisor.module').then(m => m.GeovisorModule)
  },
  {
    path: 'metadata',
    loadChildren: () => import('./metadata/metadata.module').then(m => m.MetadataModule)
  }
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingRoutingModule { }
