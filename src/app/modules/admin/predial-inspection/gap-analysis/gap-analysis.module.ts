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
import { ImagenComponent } from './containers/imagen/imagen.component';
import { WithoutBatchComponent } from './containers/apple-without-batch/without-batch.component';
import { SubLandComponent } from './containers/sub-land/sub-land.component';
import { PointsWithoutLandComponent } from './containers/points-without-land/points-without-land.component';
import { SearchLandWithoutGeoTableComponent } from './components/search-land-without-geo-table/search-land-without-geo-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { LandWithoutGeoTableComponent } from './components/land-without-geo-table/land-without-geo-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LandMapPreGeoreferencingComponent } from './components/land-map-geo/land-map-pre-georeferencing.component';
import { LandDetailPreGeoreferencingComponent } from './components/land-detail-geo/land-detail-pre-georeferencing.component';
import { GapAnalysisMapComponent } from './components/gap-analysis-map/gap-analysis-map.component';
import { GapAnalysisBlockListComponent } from './components/gap-analysis-block-list/gap-analysis-block-list.component';




@NgModule({
  declarations: [
    GapAnalysisPage,
    GapListComponent,
    CardDeatailComponent,
    GeoreferencingComponent,
    DataPropertyComponent,
    GrowthAppleComponent,
    ImagenComponent,
    WithoutBatchComponent,
    SubLandComponent,
    PointsWithoutLandComponent,
SearchLandWithoutGeoTableComponent,
 LandWithoutGeoTableComponent,
 LandMapPreGeoreferencingComponent,
 LandDetailPreGeoreferencingComponent,
 GapAnalysisMapComponent,
 GapAnalysisBlockListComponent
  ],
  imports: [
    CommonModule,
    GapAnalysisRoutingModule,
    MatIconModule,
    SharedModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,

  ]
})
export class GapAnalysisModule { }
