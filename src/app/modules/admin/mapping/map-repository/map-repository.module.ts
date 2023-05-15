import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRepositoryRoutingModule } from './map-repository-routing.module';
import { MapRepositoryPage } from './map-repository/map-repository.page';


@NgModule({
  declarations: [
    MapRepositoryPage
  ],
  imports: [
    CommonModule,
    MapRepositoryRoutingModule
  ]
})
export class MapRepositoryModule { }
