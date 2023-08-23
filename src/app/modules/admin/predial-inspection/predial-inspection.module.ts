import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredialInspectionRoutingModule } from './predial-inspection-routing.module';
import { PredialPage } from './pages/predial/predial.page';
import { ListComponent } from './container/list/list.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    PredialPage,
    ListComponent,
  ],
  imports: [
    CommonModule,
    PredialInspectionRoutingModule,
    MatIconModule,
    SharedModule,
  ]
})
export class PredialInspectionModule { }
