import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeovisorRoutingModule } from './geovisor-routing.module';
import { MapComponent } from './components/map/map.component';
import { GeovisorComponent } from './pages/geovisor/geovisor.component';
import { FiltersComponent } from './components/filters/filters.component';


@NgModule({
  declarations: [
    MapComponent,
    GeovisorComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    GeovisorRoutingModule
  ]
})
export class GeovisorModule { }
