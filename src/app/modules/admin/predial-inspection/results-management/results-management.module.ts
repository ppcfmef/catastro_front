import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsManagementRoutingModule } from './results-management-routing.module';
import { ResultsManagementPage } from './pages/results-management/results-management.page';
import { SharedModule } from '../shared/shared.module';
import { ResultsComponent } from './container/results/results.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    ResultsManagementPage,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    ResultsManagementRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    SharedModule
  ]
})
export class ResultsManagementModule { }
