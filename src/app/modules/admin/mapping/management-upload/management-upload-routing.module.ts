import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { ManagementUploadPage } from './management-upload.page';
//import { GeovisorComponent } from './pages/geovisor/geovisor.component';

const routes: Routes = [
    {
      path: '',
      component:  ManagementUploadPage,
      canActivate: [NavigationAuthorizationGuard],
      data: { id: 'gescarcart', permissionType: 'read' },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementUploadRoutingModule { }
