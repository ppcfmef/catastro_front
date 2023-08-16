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


@NgModule({
  declarations: [
    ResultsManagementPage,
    ResultsComponent,
    TicketPendingComponent,
    DatalandComponent,
    TicketRejectedComponent
  ],
  imports: [
    CommonModule,
    ResultsManagementRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    SharedModule,

    MatExpansionModule,
  ]
})
export class ResultsManagementModule { }
