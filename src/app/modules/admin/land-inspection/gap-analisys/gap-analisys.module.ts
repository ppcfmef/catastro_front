import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GapAnalisysRoutingModule } from './gap-analisys-routing.module';
import { GapAnalisysMenuComponent } from './pages/gap-analisys-menu/gap-analisys-menu.component';
import { LandWithoutGeoreferencingComponent } from './pages/land-without-georeferencing/land-without-georeferencing.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
//import { SharedModule } from 'app/shared/shared.module';
import { SharedModule as CustomSharedModule } from 'app/shared/shared.module';
import { CardGapMenuItemComponent } from './components/card-gap-menu-item/card-gap-menu-item.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SearchLandWithoutGeoTableComponent } from './components/search-land-without-geo-table/search-land-without-geo-table.component';
import { LandWithoutGeoTableComponent } from './components/land-without-geo-table/land-without-geo-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    GapAnalisysMenuComponent,
    LandWithoutGeoreferencingComponent,
    CardGapMenuItemComponent,
    SearchLandWithoutGeoTableComponent,
    LandWithoutGeoTableComponent
  ],
  imports: [
    CommonModule,
    GapAnalisysRoutingModule,
    CustomSharedModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class GapAnalisysModule { }
