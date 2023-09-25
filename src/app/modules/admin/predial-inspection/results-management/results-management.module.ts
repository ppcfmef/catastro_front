import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsManagementRoutingModule } from './results-management-routing.module';
import { ResultsManagementPage } from './pages/results-management/results-management.page';
import { SharedModule } from '../shared/shared.module';
import { ResultsComponent } from './container/results/results.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TicketPendingComponent } from './container/ticket-pending/ticket-pending.component';
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
import { TicketComponent } from './components/ticket/ticket.component';
import { CaseComponent } from './components/case/case.component';
import { CaseSuministroComponent } from './components/case-suministro/case-suministro.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    ResultsManagementPage,
    ResultsComponent,
    TicketPendingComponent,
    DatalandComponent,
    TicketRejectedComponent,
    SelectTicketsComponent,
    TicketComponent,
    CaseComponent,
    CaseSuministroComponent,
    TableComponent,
    ModalComponent
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
    FormsModule
  ]
})
export class ResultsManagementModule { }
