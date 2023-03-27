import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionsComponent} from './permissions.component';
import {AssignmentsComponent} from './containers/assignments/assignments.component';
import {ListComponent} from './containers/list/list.component';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';

const routes: Routes = [
    {
        path: '',
        component: PermissionsComponent,
        children: [
            {
                path: '',
                component: ListComponent,
                canActivate: [NavigationAuthorizationGuard],
                data: { id: 'gupermi', permissionType: 'read' },
            },
            {
                path: 'add',
                component: AssignmentsComponent,
                canActivate: [NavigationAuthorizationGuard],
                data: { id: 'gupermi', permissionType: 'add' },
            },
            {
                path: ':id',
                component: AssignmentsComponent,
                canActivate: [NavigationAuthorizationGuard],
                data: { id: 'gupermi', permissionType: 'edit' },
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PermissionsRouting {
}
