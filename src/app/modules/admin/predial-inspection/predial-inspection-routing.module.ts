/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PredialPage } from './pages/predial/predial.page';
import { GapAnalysisModule } from './gap-analysis/gap-analysis.module';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { ListComponent } from './container/list/list.component';

const routes: Routes = [
    {
        path: '',
        component: PredialPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'inspre', permissionType: 'read' },
      },
      {
        path: 'gap-analysis',
                loadChildren: () => import('./gap-analysis/gap-analysis.module').then(m => m.GapAnalysisModule)
      },
      {
        path: 'assignment-of-load',
                loadChildren: () => import('./assignment-of-load/assignment-of-load.module').then(m => m.AssignmentOfLoadModule)
      },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredialInspectionRoutingModule { }
