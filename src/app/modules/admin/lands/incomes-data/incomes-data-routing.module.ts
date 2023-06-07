import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RTContribuyentePage } from './pages/rtcontribuyente/rtcontribuyente.page';

const routes: Routes = [
  {
    path: 'rtcontribuyente',
    component: RTContribuyentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomesDataRoutingModule { }
