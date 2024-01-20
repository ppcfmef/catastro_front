import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeovisorRoutingModule } from './geovisor-routing.module';
import { MapComponent } from './components/map/map.component';
import { GeovisorComponent } from './pages/geovisor/geovisor.component';
import { FiltersComponent } from './components/filters/filters.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';


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
