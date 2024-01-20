import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValuationRoutingModule } from './valuation.routing';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '../../../shared/shared.module';
import { ValuationComponent } from './valuation.component';
import { FiltersComponent } from './components/filters/filters.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MapComponent } from './components/map/map.component';

import { LandRegistryModule } from '../lands/land-registry/land-registry.module';

@NgModule({
  declarations: [
    ValuationComponent,
    FiltersComponent,
    MapComponent
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
    //MapsModule,
    LandRegistryModule
  ]
})
export class ValuationModule { }
