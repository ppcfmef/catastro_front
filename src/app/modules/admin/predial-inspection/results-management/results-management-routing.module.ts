import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsManagementPage } from './pages/results-management/results-management.page';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { ResultsComponent } from './container/results/results.component';

const routes: Routes = [
    {
        path: '',
        component: ResultsManagementPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'gescarmeta', permissionType: 'read' },
        children:[
            {path: '',component: ResultsComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsManagementRoutingModule { }
