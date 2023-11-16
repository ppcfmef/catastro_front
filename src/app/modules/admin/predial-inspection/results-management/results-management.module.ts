import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsManagementRoutingModule } from './results-management-routing.module';
import { ResultsManagementPage } from './pages/results-management/results-management.page';
import { SharedModule } from '../shared/shared.module';
import { ResultsComponent } from './container/results/results.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatalandComponent } from './components/dataland/dataland.component';
import { TicketRejectedComponent } from './container/ticket-rejected/ticket-rejected.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SelectTicketsComponent } from './components/select-tickets/select-tickets.component';
import { TicketComponent } from './container/ticket/ticket.component';
import { CaseComponent } from './components/case/case.component';
import { CaseSuministroComponent } from './components/case-suministro/case-suministro.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TicketDoneComponent } from './container/ticket-done/ticket-done.component';
import { PrevisualizacionComponent } from './container/previsualizacion/previsualizacion.component';
import { ShortTableComponent } from './components/short-table/short-table.component';
import { ListImagesComponent } from './container/list-images/list-images.component';
import { TicketPredioSubvaluadoComponent } from './container/ticket-predio-subvaluado/ticket-predio-subvaluado.component';
import { MatInputModule } from '@angular/material/input';


import { TicketMapComponent } from './container/ticket-map/ticket-map.component';
import { WidgetMapComponent } from './components/widget-map/widget-map.component';
import { LocationComponent } from './container/location/location.component';

import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  declarations: [
    ResultsManagementPage,
    ResultsComponent,
    DatalandComponent,
    TicketRejectedComponent,
    SelectTicketsComponent,
    TicketComponent,
    CaseComponent,
    CaseSuministroComponent,
    TableComponent,
    ModalComponent,
    TicketDoneComponent,
    PrevisualizacionComponent,
    ShortTableComponent,
    ListImagesComponent,
    TicketPredioSubvaluadoComponent,
    TicketMapComponent,
    WidgetMapComponent,
    LocationComponent,

  ],
  imports: [
    CommonModule,
    ResultsManagementRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    ReactiveFormsModule,
    OverlayModule,
    ScrollingModule,
    CdkAccordionModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatCarouselModule.forRoot(),
  ]
})
export class ResultsManagementModule { }
