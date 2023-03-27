import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValuationComponent } from './valuation.component';

const routes: Routes = [
    {
      path: '',
      component: ValuationComponent,
      data: { id: 'gesvalo', permissionType: 'read' },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValuationRoutingModule { }
