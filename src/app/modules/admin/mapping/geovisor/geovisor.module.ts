import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeovisorRoutingModule } from './geovisor-routing.module';
import { MapComponent } from './components/map/map.component';
import { GeovisorComponent } from './pages/geovisor/geovisor.component';
import { FiltersComponent } from './components/filters/filters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MapComponent,
    GeovisorComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    GeovisorRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
  ]
})
export class GeovisorModule { }
