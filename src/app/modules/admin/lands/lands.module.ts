import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandsRoutingModule } from './lands-routing.module';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchMapComponent } from './land-registry/components/search-map/searchMap.component';
import { DetailComponent } from '../security/modules/user-monitoring/components/detail/detail.component';
import { DetailObserverComponent } from './maintenance/components/detail-observer/detail-observer.component';




@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    LandsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SearchMapComponent,
    DetailObserverComponent,
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color:'#219ef9' },
}]

})

export class LandsModule { }
