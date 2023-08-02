/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicMappingPage } from './pages/basic-mapping/basic-mapping.page';
import { MappingComponent } from './mapping.component';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: MappingComponent,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gescargeo', permissionType: 'read' },
  },
  {
    path: 'basic',
    component: BasicMappingPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gescardato', permissionType: 'read' },
  },
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
  },
  {
    path: 'repository',
    loadChildren: () => import('./map-repository/map-repository.module').then(m => m.MapRepositoryModule)
  },
  {
    path: 'land-maintenance',
    loadChildren: () => import('./map-land-maintenance/map-land-maintenance.module').then(m => m.MapLandMaintenanceModule)
  },
  {
    path: 'assignment-of-load',
    loadChildren: () => import('./assignment-of-load/assignment-of-load.module').then(m => m.AssignmentOfLoadModule)
  },
  {
    path: 'gap-analysis',
    loadChildren: () => import('./gap-analysis/gap-analysis.module').then(m => m.GapAnalysisModule)
  }
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingRoutingModule { }
