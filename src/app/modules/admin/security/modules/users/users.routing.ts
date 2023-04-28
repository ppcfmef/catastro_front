import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users.component';
import {ListComponent} from './containers/list/list.component';
import {AddEditComponent} from './containers/add-edit/add-edit.component';
import { NavigationAuthorizationGuard } from 'app/shared/guards/navigation-authorization.guard';


const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: '',
                component: ListComponent,
                canActivate: [NavigationAuthorizationGuard],
                data: { id: 'guuser', permissionType: 'read' },
                children: [
                    {
                        path: 'add',
                        component: AddEditComponent,
                        canActivate: [NavigationAuthorizationGuard],
                        data: { id: 'guuser', permissionType: 'add' },
                    },
                    {
                        path: ':id',
                        component: AddEditComponent,
                        canActivate: [NavigationAuthorizationGuard],
                        data: { id: 'guuser', permissionType: 'edit' },
                    }
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRouting {
}
