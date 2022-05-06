import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValuationComponent } from './valuation.component';

const routes: Routes = [
    {path: '', component: ValuationComponent}
    //{path: 'test', component: ValuationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValuationRoutingModule { }
