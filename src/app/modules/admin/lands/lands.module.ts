import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandsRoutingModule } from './lands-routing.module';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchMapComponent } from './land-registry/components/search-map/searchMap.component';




@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    LandsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SearchMapComponent
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color:'#219ef9' },
}]

})

export class LandsModule { }
