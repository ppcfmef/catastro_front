import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GapAnalisysRoutingModule } from './gap-analisys-routing.module';
import { GapAnalisysMenuComponent } from './pages/gap-analisys-menu/gap-analisys-menu.component';
import { LandWithoutGeoreferencingComponent } from './pages/land-without-georeferencing/land-without-georeferencing.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    GapAnalisysMenuComponent,
    LandWithoutGeoreferencingComponent
  ],
  imports: [
    CommonModule,
    GapAnalisysRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatIconModule
  ]
})
export class GapAnalisysModule { }
