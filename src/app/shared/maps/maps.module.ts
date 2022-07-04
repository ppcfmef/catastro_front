import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowMapPointComponent } from './components/show-map-point/show-map-point.component';


@NgModule({
  declarations: [
    ShowMapPointComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowMapPointComponent,
  ]
})
export class MapsModule { }
