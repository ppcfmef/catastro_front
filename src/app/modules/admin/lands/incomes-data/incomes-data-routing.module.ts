import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RTContribuyentePage } from './pages/rtcontribuyente/rtcontribuyente.page';
import { RTMarcoPredioPage } from './pages/rtmarco-predio/rtmarco-predio.page';
import { RTArancelPage } from './pages/rtarancel/rtarancel.page';
import { RTPredioDatoPage } from './pages/rtpredio-dato/rtpredio-dato.page';
import { RTPredioCaracteristicaPage } from './pages/rtpredio-caracteristica/rtpredio-caracteristica.page';
import { RTRecaudacionPage } from './pages/rtrecaudacion/rtrecaudacion.page';
import { RTDeudaPage } from './pages/rtdeuda/rtdeuda.page';
import { RTEmisionPage } from './pages/rtemision/rtemision.page';
import { RTBaseImponiblePage } from './pages/rtbase-imponible/rtbase-imponible.page';
import { RTAlicuotaPage } from './pages/rtalicuota/rtalicuota.page';
import { RTAmnistiaContribuyentePage } from './pages/rtamnistia-contribuyente/rtamnistia-contribuyente.page';
import { RTAmnistiaMunicipalPage } from './pages/rtamnistia-municipal/rtamnistia-municipal.page';
import { RTVaremMunicipalPage } from './pages/rtvarem-municipal/rtvarem-municipal.page';

const routes: Routes = [
  {
    path: 'rtcontribuyente',
    component: RTContribuyentePage
  },
  {
    path: 'rtmarco-predrio',
    component: RTMarcoPredioPage
  },
  {
    path: 'rtarancel',
    component: RTArancelPage
  },
  {
    path: 'rtprediodato',
    component: RTPredioDatoPage
  },
  {
    path: 'rtprediocaracteristica',
    component: RTPredioCaracteristicaPage
  },
  {
    path: 'rtrecaudacion',
    component: RTRecaudacionPage
  },
  {
    path: 'rtdeuda',
    component: RTDeudaPage
  },
  {
    path: 'rtemision',
    component: RTEmisionPage
  },
  {
    path: 'rtbaseimponible',
    component: RTBaseImponiblePage
  },
  {
    path: 'rtalicuota',
    component: RTAlicuotaPage
  },
  {
    path: 'rtamnistiacontribuyente',
    component: RTAmnistiaContribuyentePage
  },
  {
    path: 'rtamnistiamunicipal',
    component: RTAmnistiaMunicipalPage
  },
  {
    path: 'rtvaremmunicipal',
    component: RTVaremMunicipalPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomesDataRoutingModule { }
