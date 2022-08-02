import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeovisorComponent } from './pages/geovisor/geovisor.component';

const routes: Routes = [
    {path: '', component:  GeovisorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeovisorRoutingModule { }
