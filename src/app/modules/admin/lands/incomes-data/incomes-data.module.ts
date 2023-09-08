import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { IncomesDataRoutingModule } from './incomes-data-routing.module';
import { RTContribuyentePage } from './pages/rtcontribuyente/rtcontribuyente.page';
import { RTContribuyenteContainerComponent } from './components/rtcontribuyente-container/rtcontribuyente-container.component';
import { RTMarcoPredioPage } from './pages/rtmarco-predio/rtmarco-predio.page';
import { RTArancelPage } from './pages/rtarancel/rtarancel.page';
import { RTArancelContainerComponent } from './components/rtarancel-container/rtarancel-container.component';
import { RTMarcoPredioContainerComponent } from './components/rtmarco-predio-container/rtmarco-predio-container.component';
import { SelectIcomesTableComponent } from './components/select-icomes-table/select-icomes-table.component';
import { RTPredioDatoPage } from './pages/rtpredio-dato/rtpredio-dato.page';
import { RTPredioCaracteristicaPage } from './pages/rtpredio-caracteristica/rtpredio-caracteristica.page';
import { RTDeudaPage } from './pages/rtdeuda/rtdeuda.page';
import { RTEmisionPage } from './pages/rtemision/rtemision.page';
import { RTBaseImponiblePage } from './pages/rtbase-imponible/rtbase-imponible.page';
import { RTAlicuotaPage } from './pages/rtalicuota/rtalicuota.page';
import { RTAmnistiaContribuyentePage } from './pages/rtamnistia-contribuyente/rtamnistia-contribuyente.page';
import { RTAmnistiaMunicipalPage } from './pages/rtamnistia-municipal/rtamnistia-municipal.page';
import { RTVaremMunicipalPage } from './pages/rtvarem-municipal/rtvarem-municipal.page';
import { RTRecaudacionPage } from './pages/rtrecaudacion/rtrecaudacion.page';


@NgModule({
  declarations: [
    RTContribuyentePage,
    RTContribuyenteContainerComponent,
    RTMarcoPredioPage,
    RTArancelPage,
    RTArancelContainerComponent,
    RTMarcoPredioContainerComponent,
    SelectIcomesTableComponent,
    RTPredioDatoPage,
    RTPredioCaracteristicaPage,
    RTDeudaPage,
    RTEmisionPage,
    RTBaseImponiblePage,
    RTAlicuotaPage,
    RTAmnistiaContribuyentePage,
    RTAmnistiaMunicipalPage,
    RTVaremMunicipalPage,
    RTRecaudacionPage,
  ],
  imports: [
    CommonModule,
    IncomesDataRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class IncomesDataModule { }
