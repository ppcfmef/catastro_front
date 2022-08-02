import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeovisorRoutingModule } from './geovisor-routing.module';
import { MapComponent } from './components/map/map.component';
import { GeovisorComponent } from './pages/geovisor/geovisor.component';


@NgModule({
  declarations: [
    MapComponent,
    GeovisorComponent
  ],
  imports: [
    CommonModule,
    GeovisorRoutingModule
  ]
})
export class GeovisorModule { }
