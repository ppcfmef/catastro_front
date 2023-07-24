import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'gap-analisys',
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        loadChildren: () => import('./gap-analisys/gap-analisys.module').then(m => m.GapAnalisysModule)
      },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandInspectionRoutingModule { }
