import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowMapPointComponent } from './components/show-map-point/show-map-point.component';
import { LandRegistryGeolocationComponent } from './components/land-registry-geolocation/land-registry-geolocation.component';



@NgModule({
  declarations: [
    ShowMapPointComponent,
    LandRegistryGeolocationComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowMapPointComponent,
    LandRegistryGeolocationComponent,
  ]
})
export class MapsModule { }
