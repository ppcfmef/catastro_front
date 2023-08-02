import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GapAnalysisModule } from './gap-analysis.module';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { GapAnalysisPage } from './pages/gap-analysis/gap-analysis.page';

const routes: Routes = [
    {
        path: '',
        component: GapAnalysisPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'gescarmeta', permissionType: 'read' },
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GapAnalysisRoutingModule { }
