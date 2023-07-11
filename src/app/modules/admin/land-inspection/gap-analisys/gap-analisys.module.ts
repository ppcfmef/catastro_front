import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GapAnalisysRoutingModule } from './gap-analisys-routing.module';
import { GapAnalisysMenuComponent } from './pages/gap-analisys-menu/gap-analisys-menu.component';


@NgModule({
  declarations: [
    GapAnalisysMenuComponent
  ],
  imports: [
    CommonModule,
    GapAnalisysRoutingModule
  ]
})
export class GapAnalisysModule { }
