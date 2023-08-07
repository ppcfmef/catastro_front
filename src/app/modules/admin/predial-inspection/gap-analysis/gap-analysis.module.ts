import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GapAnalysisRoutingModule } from './gap-analysis-routing.module';
import { GapAnalysisPage } from './pages/gap-analysis/gap-analysis.page';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


import { GapListComponent } from './containers/gap-list/gap-list.component';
import { GeoreferencingComponent } from './containers/georeferencing/georeferencing.component';
import { CardDeatailComponent } from './components/card-deatail/card-deatail.component';
import { SharedModule } from '../shared/shared.module';
import { DataPropertyComponent } from './containers/data-property/data-property.component';
import { GrowthAppleComponent } from './containers/growth-apple/growth-apple.component';




@NgModule({
  declarations: [
    GapAnalysisPage,
    GapListComponent,
    CardDeatailComponent,
    GeoreferencingComponent,
    DataPropertyComponent,
    GrowthAppleComponent,

  ],
  imports: [
    CommonModule,
    GapAnalysisRoutingModule,
    MatIconModule,
    SharedModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class GapAnalysisModule { }
