import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsManagementPage } from './pages/results-management/results-management.page';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { ResultsComponent } from './container/results/results.component';

import { TicketRejectedComponent } from './container/ticket-rejected/ticket-rejected.component';
import { TicketComponent } from './container/ticket/ticket.component';
import { TicketDoneComponent } from './container/ticket-done/ticket-done.component';
import { TicketPredioSubvaluadoComponent } from './container/ticket-predio-subvaluado/ticket-predio-subvaluado.component';

const routes: Routes = [
    {
        path: '',
        component: ResultsManagementPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'resmanagip', permissionType: 'read' },
        children:[
            {path: '',component: ResultsComponent},

            /*{path: 'location/:id',component: TicketPendingComponent,
            },*/
            {path: 'ticket/:id',component: TicketComponent,},
            {path: 'ticket-rejected/:id',component: TicketRejectedComponent},
            {path: 'ticket-done/:id',component: TicketDoneComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsManagementRoutingModule { }
