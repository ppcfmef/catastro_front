import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsManagementPage } from './pages/results-management/results-management.page';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { ResultsComponent } from './container/results/results.component';
import { TicketPendingComponent } from './container/ticket-pending/ticket-pending.component';
import { TicketRejectedComponent } from './container/ticket-rejected/ticket-rejected.component';

const routes: Routes = [
    {
        path: '',
        component: ResultsManagementPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'resmanagip', permissionType: 'read' },
        children:[
            {path: '',component: ResultsComponent},
            {path: 'ticket-pending',component: TicketPendingComponent},
            {path: 'ticket-rejected',component: TicketRejectedComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsManagementRoutingModule { }
