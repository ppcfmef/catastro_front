import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapLandMaintenanceRoutingModule } from './map-land-maintenance-routing.module';
import { ViewerLandMaintenancePage } from './viewer-land-maintenance/viewer-land-maintenance.page';


@NgModule({
  declarations: [
    ViewerLandMaintenancePage
  ],
  imports: [
    CommonModule,
    MapLandMaintenanceRoutingModule
  ]
})
export class MapLandMaintenanceModule { }
