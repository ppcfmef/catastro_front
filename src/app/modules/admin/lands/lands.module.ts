import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandsRoutingModule } from './lands-routing.module';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';




@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    LandsRoutingModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color:'#219ef9' },
}]

})

export class LandsModule { }
