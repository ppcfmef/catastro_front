import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RTContribuyentePage } from './pages/rtcontribuyente/rtcontribuyente.page';
import { RTMarcoPredioPage } from './pages/rtmarco-predio/rtmarco-predio.page';
import { RTArancelPage } from './pages/rtarancel/rtarancel.page';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomesDataRoutingModule { }
