import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentOfLoadPage } from './pages/assignment-of-load/assignment-of-load.page';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';
import { LoadAssignedComponent } from './containers/load-assigned/load-assigned.component';
import { LoadPendingAssignmentComponent } from './containers/load-pending-assignment/load-pending-assignment.component';
import { LoadAttendComponent } from './containers/load-attend/load-attend.component';
import { LoadListComponent } from './containers/load-list/load-list.component';
import { AssignLoadComponent } from './containers/assign-load/assign-load.component';


const routes: Routes = [
{
    path: '',
    component: AssignmentOfLoadPage,
    canActivate: [NavigationAuthorizationGuard],
    data: { id: 'gescarmeta', permissionType: 'read' },
    children:[
        {path: '',component: LoadListComponent},
        {path:'assign-load',component: AssignLoadComponent,},
        {path: 'load-assigned/:cod',component:LoadAssignedComponent},
        {path:'pending/:cod', component:LoadPendingAssignmentComponent},
        {path:'load-attend/:cod',component:LoadAttendComponent}

    ]
},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AssignmentOfLoadRoutingModule { }
