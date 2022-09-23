import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementUploadPage } from './management-upload.page';
//import { GeovisorComponent } from './pages/geovisor/geovisor.component';

const routes: Routes = [
    {path: '', component:  ManagementUploadPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementUploadRoutingModule { }
