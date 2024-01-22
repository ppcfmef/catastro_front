import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GapAnalysisRoutingModule } from './gap-analysis-routing.module';
import { GapAnalysisPage } from './pages/gap-analysis/gap-analysis.page';

import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

import { GapListComponent } from './containers/gap-list/gap-list.component';
import { GeoreferencingComponent } from './containers/georeferencing/georeferencing.component';
import { CardDeatailComponent } from './components/card-deatail/card-deatail.component';
import { SharedModule } from '../shared/shared.module';
import { DataPropertyComponent } from './containers/data-property/data-property.component';

import { ImagenComponent } from './containers/imagen/imagen.component';
import { WithoutBatchComponent } from './containers/block-without-batch/without-batch.component';
import { SubLandComponent } from './containers/sub-land/sub-land.component';
import { PointsWithoutLandComponent } from './containers/points-without-land/points-without-land.component';
import { SearchLandWithoutGeoTableComponent } from './components/search-land-without-geo-table/search-land-without-geo-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { LandWithoutGeoTableComponent } from './components/land-without-geo-table/land-without-geo-table.component';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { LandMapPreGeoreferencingComponent } from './components/land-map-geo/land-map-pre-georeferencing.component';
import { LandDetailPreGeoreferencingComponent } from './components/land-detail-geo/land-detail-pre-georeferencing.component';
import { GapAnalysisMapComponent } from './components/gap-analysis-map/gap-analysis-map.component';
import { GapAnalysisBlockListComponent } from './components/gap-analysis-block-list/gap-analysis-block-list.component';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { GrowingBlockComponent } from './containers/growing-block/growing-block.component';

@NgModule({
    declarations: [
        GapAnalysisPage,
        GapListComponent,
        CardDeatailComponent,
        GeoreferencingComponent,
        DataPropertyComponent,
        ImagenComponent,
        WithoutBatchComponent,
        SubLandComponent,
        PointsWithoutLandComponent,
        SearchLandWithoutGeoTableComponent,
        LandWithoutGeoTableComponent,
        LandMapPreGeoreferencingComponent,
        LandDetailPreGeoreferencingComponent,
        GapAnalysisMapComponent,
        GapAnalysisBlockListComponent,
        GrowingBlockComponent,
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
        MatAutocompleteModule,
    ],
})
export class GapAnalysisModule {}
