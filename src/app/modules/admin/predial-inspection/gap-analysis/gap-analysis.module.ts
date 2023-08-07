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




@NgModule({
  declarations: [
    GapAnalysisPage,
    GapListComponent,
    CardDeatailComponent,
    GeoreferencingComponent,

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
