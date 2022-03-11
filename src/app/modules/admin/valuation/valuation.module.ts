import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValuationRoutingModule } from './valuation.routing';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '../../../shared/shared.module';
import { ValuationComponent } from './valuation.component';

@NgModule({
  declarations: [
    ValuationComponent
  ],
  imports: [
    CommonModule,
    ValuationRoutingModule,
    SharedModule,
    MatIconModule
  ]
})
export class ValuationModule { }
