import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomesDataRoutingModule } from './incomes-data-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RTContribuyentePage } from './pages/rtcontribuyente/rtcontribuyente.page';
import { RTContribuyenteContainerComponent } from './components/rtcontribuyente-container/rtcontribuyente-container.component';


@NgModule({
  declarations: [
    RTContribuyentePage,
    RTContribuyenteContainerComponent
  ],
  imports: [
    CommonModule,
    IncomesDataRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class IncomesDataModule { }
