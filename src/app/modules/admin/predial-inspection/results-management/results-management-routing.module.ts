import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsManagementPage } from './pages/results-management/results-management.page';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { ResultsComponent } from './container/results/results.component';
import { TicketPendingComponent } from './container/ticket-pending/ticket-pending.component';
import { TicketRejectedComponent } from './container/ticket-rejected/ticket-rejected.component';
import { TicketComponent } from './container/ticket/ticket.component';
import { TicketDoneComponent } from './container/ticket-done/ticket-done.component';
import { PrevisualizacionComponent } from './container/previsualizacion/previsualizacion.component';
import { TicketPredioSubvaluadoComponent } from './container/ticket-predio-subvaluado/ticket-predio-subvaluado.component';
import { TicketPuntoImagenComponent } from './container/ticket-punto-imagen/ticket-punto-imagen.component';

const routes: Routes = [
    {
        path: '',
        component: ResultsManagementPage,
        canActivate: [NavigationAuthorizationGuard],
        data: { id: 'resmanagip', permissionType: 'read' },
        children:[
            {path: '',component: ResultsComponent},
            {path: 'ticket-pending/:id',component: TicketPendingComponent,
                children:[
                    {path:'puntoImagen/:id',component:TicketPuntoImagenComponent},
                    {path:'predio/:id',component:TicketComponent},
                    {path:'sub/:id',component:TicketPredioSubvaluadoComponent}
                ]
            },
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
