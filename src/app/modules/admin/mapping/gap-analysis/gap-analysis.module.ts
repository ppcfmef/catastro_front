import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GapAnalysisRoutingModule } from './gap-analysis-routing.module';
import { GapAnalysisPage } from './pages/gap-analysis/gap-analysis.page';


@NgModule({
  declarations: [
    GapAnalysisPage
  ],
  imports: [
    CommonModule,
    GapAnalysisRoutingModule
  ]
})
export class GapAnalysisModule { }
