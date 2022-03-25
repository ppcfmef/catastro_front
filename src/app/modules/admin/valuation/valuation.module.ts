import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValuationRoutingModule } from './valuation.routing';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '../../../shared/shared.module';
import { ValuationComponent } from './valuation.component';
import { FiltersComponent } from './components/filters/filters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ValuationComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    ValuationRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
  ]
})
export class ValuationModule { }
