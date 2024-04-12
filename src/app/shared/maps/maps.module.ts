import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowMapPointComponent } from './components/show-map-point/show-map-point.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ShowMapPointComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ShowMapPointComponent,
  ]
})
export class MapsModule { }
