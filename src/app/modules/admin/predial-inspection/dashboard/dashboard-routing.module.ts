import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { DashboardPage } from './pages/dashboard/dashboard.page';


const routes: Routes = [
{
    path: '',
    component: DashboardPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'inspedash', permissionType: 'read' },
},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }
